import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class HealthIncreasedTiming extends Timing {
    private prevHealth: number;
    constructor(runner: Runner) {
            super(runner);
            this.prevHealth = runner.health.current.value;
            this._emitters.push(new EventEmitter());
            runner.health.addListener('change', () => {
                if(runner.health.current.value > this.prevHealth) {
                    this._emitters.forEach(emitter => {
                        emitter.emit(Timing.activateEvent);
                    });
                }
                this.prevHealth = runner.health.current.value;
            });
        }
}