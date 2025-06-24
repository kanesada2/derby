import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class ExhaustedTiming extends Timing {
    constructor(runner: Runner) {
        super(runner);
        this._emitters.push(new EventEmitter());
        runner.exhausted.addListener('change', () => {
            if(runner.exhausted.activated) {
                this._emitters.forEach(emitter => {
                    emitter.emit(Timing.activateEvent);
                });
            } else {
                this._emitters.forEach(emitter => {
                    emitter.emit(Timing.deactivateEvent);
                });
            }
        });
    }
}