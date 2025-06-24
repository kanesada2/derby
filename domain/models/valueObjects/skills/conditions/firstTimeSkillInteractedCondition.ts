import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Condition } from "../condition";

export class FirstTimeSkillInteractedCondition extends Condition {
    private count = 0;
    constructor(runner: Runner) {
        super(runner);
        const emitter = new EventEmitter();
        this._emitters.push(emitter);
        runner.skillInteractors.forEach(interactor => {
            interactor.addListener('change', ()=> {
                this._active = this.count < 1;
                emitter.emit('change', this._active);
                this.count++;
            });
        });
    }

    // Additional methods can be added here if needed
}