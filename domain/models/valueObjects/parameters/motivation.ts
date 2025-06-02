import { Parameter } from '../parameter';
import { SpeedLevel } from './speedLevel';

export class Motivation extends Parameter {
    public static readonly MAX: number = 15000;
    private static readonly DEFAULT_CURRENT: number = 0; 
    private static readonly DEFAULT_SPAN: number = 1;

    constructor(
        private speedLevel: SpeedLevel,
        enhancement: number|null = null
    ) {
        super(Motivation.MAX, Motivation.DEFAULT_CURRENT, Motivation.DEFAULT_SPAN);
        if(enhancement !== null) {
            this._span.value = Motivation.calculateSpanWithEnhancement(enhancement);
        }
        this.speedLevel.addListener('change', this.increase.bind(this));
    }

    static calculateSpanWithEnhancement(enhancement: number): number {
        return Motivation.DEFAULT_SPAN * (1 + enhancement / 100);
    }

    get isFilled(): boolean {
        return Motivation.MAX <= this._current.value;
    }

    private increase(): void {
        this._current.value = Math.min(this._current.value + this._span.value, Motivation.MAX);
        this.emit('change', this._current.value);
    }
}