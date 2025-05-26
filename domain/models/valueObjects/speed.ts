import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { BaseSpeed } from './parameters/baseSpeed';
import { SpeedLevel } from './parameters/speedLevel';

export class Speed extends EventEmitter {
    private _value: number = 0;

    constructor(
        private _base: BaseSpeed,
        private _level: SpeedLevel
    ) {
        super();
        this._calculate();
        this._base.addListener('change', this._calculate.bind(this));
        this._level.addListener('change', this._calculate.bind(this));
    }

    get value(): number {
        return this._value;
    }

    private _calculate(): void {
        this._value = this._base.current.value * this._level.current.value;
        this.emit('change', this._value);
    }
}