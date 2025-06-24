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

    addMaxMultiplier(key: string, value: number): void {
        this._max.addMultiplier({ key, value });
        this.emit('change', this._max.value);
    }

    addCurrentMultiplier(key: string, value: number): void {
        this._current.addMultiplier({ key, value });
        this.emit('change', this._current.value);
    }

    addSpanMultiplier(key: string, value: number): void {
        this._span.addMultiplier({ key, value });
        this.emit('change', this._span.value);
    }

    removeMaxMultiplier(key: string): void {
        this._max.removeMultiplier(key);
        this.emit('change', this._max.value);
    }
    removeCurrentMultiplier(key: string): void {
        this._current.removeMultiplier(key);
        this.emit('change', this._current.value);
    }
    removeSpanMultiplier(key: string): void {
        this._span.removeMultiplier(key);
        this.emit('change', this._span.value);
    }
}