import EventEmitter from 'events';
import { BaseSpeed } from './baseSpeed';
import { SpeedLevel } from './speedLevel';

export class Speed extends EventEmitter {
    private _value: number = 0;

    constructor(
        private _base: BaseSpeed,
        private _level: SpeedLevel
    ) {
        super();
        this._calculate();
        this._base.on('change', this._calculate.bind(this));
        this._level.on('change', this._calculate.bind(this));
    }

    get value(): number {
        return this._value;
    }

    private _calculate(): void {
        this._value = this._base.value * this._level.current;
        this.emit('change', this._value);
    }
}