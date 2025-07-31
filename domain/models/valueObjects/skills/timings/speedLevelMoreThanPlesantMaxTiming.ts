import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class SpeedLevelMoreThanPlesantMaxTiming extends Timing {
    constructor(
        protected runner: Runner,
    ) {
        super(runner);
        this._emitters.push(new EventEmitter());
        runner.speedLevel.addListener('change', () => {
            if(runner.speedLevel.current.value > runner.speedLevel.pleasantMax.value) {
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