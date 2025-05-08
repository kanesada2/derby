import EventEmitter from 'events';
import { Motivated } from './status/motivated';

export class BaseSpeed extends EventEmitter {
    private static readonly MOTIVATED_MODIFIER = 1.1;
    private static readonly BASE = 13;

    private _value: number = BaseSpeed.BASE;

    constructor(
        private motivated: Motivated
    ) {
        super();
        this._calculateInitialValue();
        this.motivated.on('change', this._increaseWhenMotivated.bind(this));
    }

    get value(): number {
        return this._value;
    }

    private _calculateInitialValue(): void {
        // 0.99-1.01の間
        const modifier = 1 + (Math.random() * 0.01 - 0.005);
        this._value = BaseSpeed.BASE * modifier;
    }

    private _increaseWhenMotivated(): void {
        if (!this.motivated.activated) {
            return;
        }
        this._value *= BaseSpeed.MOTIVATED_MODIFIER;
        this.emit('change', this._value);
    }
}