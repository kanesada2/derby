import { ConditionName, EffectName, RistrictionName, SkillName, TimingName } from "@/constants/SkillNames";
import { Condition } from "./skills/condition";
import { Effect } from "./skills/effect";
import { Ristriction } from "./skills/ristriction";
import { Timing } from "./skills/timing";


export interface EffectProp {
    name: EffectName;
    parameters: number[];
}
export interface SkillProp {
    name: SkillName;
    condition: ConditionName;
    timing: TimingName;
    effects: EffectProp[];
    ristriction?: RistrictionName;
}
export class Skill {
    private _ristricted: boolean = false;
    private _activated: boolean = false;
    private _applied: boolean = false;
    constructor(
        private _condition: Condition,
        private _timing: Timing,
        private _effects: Effect[],
        private _ristriction: Ristriction
    ){
        this._condition.emitters.forEach(emitter => {
            if(this._ristricted) {
                return;
            }
            emitter.addListener('change', ()=> {
                this._activated = this._condition.active;
            });
        });
        this._timing.emitters.forEach(emitter => {
            emitter.addListener(Timing.activateEvent, ()=> {
                if(this._ristricted) {
                    return;
                }
                if(!this._activated) {
                    return;
                }
                if(!this._timing.repeatable && this._applied){
                    return;
                }
                this._effects.forEach(effect => effect.apply());
                this._applied = true;
            });
            emitter.addListener(Timing.deactivateEvent, ()=> {
                if(!this._applied) {
                    return;
                }
                this._effects.forEach(effect => effect.remove());
                this._applied = false;
            });
        });
        this._ristriction.target.addListener('change', ()=> {
            this._ristricted = this._ristriction.activated;
            if(this._ristricted && this._applied) {
                this._effects.forEach(effect => effect.remove());
            }
        });
        
        this._condition.initialize();
        this._timing.initialize();
    }
}