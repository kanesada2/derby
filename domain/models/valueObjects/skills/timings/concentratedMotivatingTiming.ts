import { Runner } from "@/domain/models/entities/runner";
import { Timing } from "../timing";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

export class ConcentratedMotivatingTiming extends Timing {
    constructor(runner: Runner) {
            super(runner);
            this._emitters.push(new EventEmitter());
            runner.location.addListener('change', () => {
                if(runner.concentrated.activated && runner.motivating.activated) {
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