import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Condition } from "../condition";

export class HasMotivationCondition extends Condition {
    constructor(runner: Runner) {
        super(runner);
        this._emitters.push(new EventEmitter());
        runner.motivation.addListener('change', () => {
            let active = this._active;
            if(runner.motivation.isExceedUnit && !this._active){
                active = !active;
            }
            if(!runner.motivation.isExceedUnit && this._active){
                active = !active;
            }
            if(this._active !== active) {
                this._active = active;
                this._emitters.forEach(emitter => {
                    emitter.emit('change', this._active);
                });
            }
        });
    }
}