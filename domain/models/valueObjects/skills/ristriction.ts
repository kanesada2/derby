import { EventEmitter } from "events";
import { Runner } from "../../entities/runner";

export class Ristriction {
    constructor(
        private _runner: Runner
    ){}

    get target(): EventEmitter {
        return this._runner.exhausted;
    }

    get activated(): boolean {
        return this._runner.exhausted.activated;
    }
}