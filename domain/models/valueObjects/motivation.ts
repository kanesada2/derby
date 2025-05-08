import EventEmitter from 'events';
import { SpeedLevel } from './speedLevel';

export class Motivation extends EventEmitter {
    private static readonly MAX: number = 1600;

    private _current: number = 0;
    private _span: number = 0.1;

    constructor(
        private speedLevel: SpeedLevel
    ) {
        super();
        this.speedLevel.on('change', this.increase.bind(this));
        this.determineSpan();
    }

    get span(): number {
        return this._span;
    }

    get current(): number {
        return this._current;
    }

    get isFilled(): boolean {
        return Motivation.MAX <= this._current;
    }

    private determineSpan(): void {
        const lotCountBase = 10;
        const lotList: number[] = [];
        
        for (let i = 0; i < lotCountBase; i++) {
            lotList.push(Math.random());
        }
        
        lotList.sort((a, b) => b - a);
        // 乱数10個の最小値~乱数80個の10番目に大きい数
        this._span = lotList[lotCountBase - 1];
    }

    private increase(): void {
        if (!this.speedLevel.isMotivating()) {
            return;
        }
        this._current = Math.min(this._current + this._span, Motivation.MAX);
        this.emit('change', this._current);
    }
}