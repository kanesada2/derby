import { Runner } from "../entities/runner";
import { Condition } from "./skills/condition";
import { Effect } from "./skills/effect";
import { Ristriction } from "./skills/ristriction";
import { Timing } from "./skills/timing";

export class Skill {
    private _ristricted: boolean = true;
    private _activated: boolean = false;
    constructor(
        private _runner: Runner,
        private _condition: Condition,
        private _timing: Timing,
        private _effect: Effect,
        private _ristriction: Ristriction
    ){
        this._condition.emitters.forEach(emitter => {
            if(!this._ristricted) {
                return;
            }
            emitter.on('change', ()=> {
                this._activated = _condition.active;
            });
        });
        this._timing.emitters.forEach(emitter => {
            emitter.on('change', ()=> {
                if(!this._ristricted) {
                    return;
                }
                if(!this._activated) {
                    return;
                }
                this._effect.apply(this._runner);
            });
        });
        this._ristriction.target.on('change', ()=> {
            this._ristricted = !this._ristriction.activated;
        });
        
    }
}