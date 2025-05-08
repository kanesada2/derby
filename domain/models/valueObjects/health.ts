import EventEmitter from 'events';
import { SpeedLevel } from './speedLevel';
import { Concentrated } from './status/concentrated';
import { Motivated } from './status/motivated';
import { Pleasant } from './status/pleasant';

export class Health extends EventEmitter {
    private static readonly MAX_BASE = 12000; // 200 * 60
    private static readonly MAX_AMPLIFIER_MAX = 6000; // 100 * 60
    private static readonly RUN_CONSUME_MODIFIER = 0.7;

    private _max: number = 0;
    private _current: number = 0;

    constructor(
        private speedLevel: SpeedLevel,
        private concentrated: Concentrated,
        private motivated: Motivated,
        private pleasant: Pleasant
    ) {
        super();
        this.determineMax();
        this._current = this._max;
        this.motivated.on('change', this.increaseByMotivated.bind(this));
    }

    get current(): number {
        return this._current;
    }

    get max(): number {
        return this._max;
    }

    get isExhausted(): boolean {
        return this._current <= 0;
    }

    private determineMax(): void {
        const lotCountBase = 10;
        const lotList: number[] = [];
        
        for (let i = 0; i < lotCountBase; i++) {
            lotList.push(Math.random());
        }
        
        lotList.sort((a, b) => b - a);
        // 乱数10個の最小値~乱数80個の10番目に大きい数
        this._max = Health.MAX_BASE + Health.MAX_AMPLIFIER_MAX * lotList[lotCountBase - 1];
    }

    decreaseByRun(): void {
        let span = SpeedLevel.MIN;
        if (this.speedLevel.current > SpeedLevel.MIN) {
            span += (this.speedLevel.current - SpeedLevel.MIN) * 5;
        }
        if (this.pleasant.activated) {
            span *= Health.RUN_CONSUME_MODIFIER;
        }
        if (this.concentrated.activated) {
            span *= Health.RUN_CONSUME_MODIFIER;
        }
        this._current = Math.max(this._current - span, 0);
        this.emit('change', this._current);
    }

    decreaseByCrawl(): void {
        if (this.concentrated.activated) {
            return;
        }
        if (this.motivated.activated) {
            return;
        }
        const span = SpeedLevel.MAX_MAX / this.speedLevel.current;
        this._current = Math.max(this._current - span, 0);
        this.emit('change', this._current);
    }

    private increaseByMotivated(): void {
        if (!this.motivated.activated) {
            return;
        }
        this._current = Math.min(this._current * 1.5, this._max);
        this.emit('change', this._current);
    }
}