import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Condition } from "../condition";

export class ExhaustedCondition extends Condition {
    constructor(runner: Runner) {
        super(runner);
        this._emitters.push(new EventEmitter());
        runner.exhausted.addListener('change', () => {
            this._active = runner.exhausted.activated;
            this._emitters.forEach(emitter => {
                emitter.emit('change');
            });
        });
    }
}