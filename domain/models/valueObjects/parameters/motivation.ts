import { Modifiable } from '../modifiable';
import { Parameter } from '../parameter';
import { SpeedLevel } from './speedLevel';

export class Motivation extends Parameter {
    private static readonly MAX: number = 1600;
    private static readonly DEFAULT_CURRENT: number = 0; 
    private static readonly DEFAULT_SPAN: number = 0.1;

    constructor(
        private speedLevel: SpeedLevel
    ) {
        super(Motivation.MAX, Motivation.DEFAULT_CURRENT, Motivation.DEFAULT_SPAN);
        this.speedLevel.addListener('change', this.increase.bind(this));
        this.determineSpan();
    }

    get isFilled(): boolean {
        return Motivation.MAX <= this._current.value;
    }

    private determineSpan(): void {
        const lotCountBase = 10;
        const lotList: number[] = [];
        
        for (let i = 0; i < lotCountBase; i++) {
            lotList.push(Math.random());
        }
        
        lotList.sort((a, b) => b - a);
        // 乱数10個の最小値~乱数80個の10番目に大きい数
        this._span = new Modifiable(lotList[lotCountBase - 1]);
    }

    private increase(): void {
        if (!this.speedLevel.isMotivating()) {
            return;
        }
        this._current.value = Math.min(this._current.value + this._span.value, Motivation.MAX);
        this.emit('change', this._current.value);
    }
}