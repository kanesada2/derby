import { Runner } from "@/domain/models/entities/runner";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Timing } from "../timing";

export class AlwaysTiming extends Timing {

    constructor(protected runner: Runner) {
        super(runner);
        const emitter = new EventEmitter();
        runner.location.addListener('change', ()=> {
            emitter.emit(Timing.activateEvent);
        });
        this._emitters.push(emitter);
    }
}