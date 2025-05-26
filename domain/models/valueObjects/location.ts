import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Speed } from './speed';

export class Location extends EventEmitter {
    private _current: number = 0;

    constructor(
        private _max: number,
        private _speed: Speed
    ) {
        super();
    }

    get current(): number {
        return this._current;
    }

    get max(): number {
        return this._max;
    }

    get isReached(): boolean {
        return this._current >= this._max;
    }

    increase(): void {
        if (this.isReached) {
            return;
        }
        this._current = Math.min(this.current + this._speed.value, this._max);
        this.emit('change', this._current);
    }
}