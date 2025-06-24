
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Runner } from "../../entities/runner";

export class Ristriction {
    constructor(
        protected _runner: Runner
    ){}

    get target(): EventEmitter {
        return this._runner.exhausted;
    }

    get activated(): boolean {
        return this._runner.exhausted.activated;
    }
}