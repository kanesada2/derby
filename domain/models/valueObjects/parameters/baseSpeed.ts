import { Parameter } from '../parameter';

export class BaseSpeed extends Parameter {
    private static readonly BASE = 13;


    constructor(isEnhanced: boolean = false
    ) {
        super(BaseSpeed.BASE * 2, BaseSpeed.BASE, 1);
        if(!isEnhanced) {
            this._calculateInitialValue();
        }
    }


    private _calculateInitialValue(): void {
        // 0.99-1.01の間
        const modifier = 1 + (Math.random() * 0.01 - 0.005);
        this._current.value = BaseSpeed.BASE * modifier;
    }
}