export interface Modifier {
    key: string;
    value: number;
}
export class Modifiable {
    private _multipliers: Modifier[] = [];
    private _offsets: Modifier[] = [];
    public value: number = 0;

    constructor(private _base: number){
        this.value = _base;
    }

    private updateValue(): void {
        let value = this._base;
        if(this._offsets.length > 0) {
        // 足してから掛ける、0以下にはならない、という仕様
            const offsetValues = this._offsets.map(m => m.value);
            value = Math.max(offsetValues.reduce((a, b) => a + b, value), 0);
        }
        if(this._multipliers.length > 0) {
            const modifierValues = this._multipliers.map(m => m.value);
            value = Math.max(value + modifierValues.reduce((a, b) => a + b) * value, 0);
        }
        this.value = value;
    }

    addMultiplier(modifier: Modifier): void {
        this._multipliers.push(modifier);
        this.updateValue();
    }

    addOffset(offset: Modifier): void {
        this._offsets.push(offset);
        this.updateValue();
    }

    removeMultiplier(key: string): void {
        this._multipliers = this._multipliers.filter(m => m.key !== key);
        this.updateValue();
    }

    removeOffset(key: string): void {
        this._offsets = this._offsets.filter(m => m.key !== key);
        this.updateValue();
    }
}