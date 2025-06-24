import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Condition } from "../condition";

export class AlwaysCondition extends Condition {

    constructor(runner: Runner) {
        super(runner);
        this._active = true;
        const emitter = new EventEmitter();
        this._emitters.push(emitter);
    }

    initialize(): void {
        this._emitters.forEach(emitter => {
            emitter.emit('change', this._active);
        });
    }

    // Additional methods can be added here if needed
}