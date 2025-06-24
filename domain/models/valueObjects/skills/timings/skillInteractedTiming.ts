import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class SkillInteractedTiming extends Timing {
    constructor(
        protected runner: Runner,
    ) {
        super(runner);
        this._emitters.push(new EventEmitter());
        runner.skillInteractors.forEach(interactor => {
            interactor.addListener('change', () => {
                this._emitters.forEach(emitter => {
                    emitter.emit(Timing.activateEvent);
                });
            });
        });
    }
}