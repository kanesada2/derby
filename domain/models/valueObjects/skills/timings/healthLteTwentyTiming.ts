import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class HealthLteTwentyTiming extends Timing {
    constructor(runner: Runner) {
            super(runner);
            this._emitters.push(new EventEmitter());
            runner.health.addListener('change', () => {
                if(runner.health.current.value > 0 &&runner.health.current.value / runner.health.max.value <= 0.2) {
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