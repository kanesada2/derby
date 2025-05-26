import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { Modifiable } from "./modifiable";

export abstract class Parameter extends EventEmitter {
    protected _max: Modifiable;
    protected _current: Modifiable;
    protected _span: Modifiable;
    constructor(
        max: number, current: number, span: number,
    ) {
        super();
        this._max = new Modifiable(max);
        this._current = new Modifiable(current);
        this._span = new Modifiable(span);
    }

    get max(): Modifiable {
        return this._max;
    }
    get current(): Modifiable {
        return this._current;
    }
    get span(): Modifiable {
        return this._span;
    }

    addMaxModifier(key: string, value: number): void {
        this._max.addModifier({ key, value });
    }

    addCurrentModifier(key: string, value: number): void {
        this._current.addModifier({ key, value });
    }

    addSpanModifier(key: string, value: number): void {
        this._span.addModifier({ key, value });
    }

    removeMaxModifier(key: string): void {
        this._max.removeModifier(key);
    }
    removeCurrentModifier(key: string): void {
        this._current.removeModifier(key);
    }
    removeSpanModifier(key: string): void {
        this._span.removeModifier(key);
    }
}