export interface Modifier {
    key: string;
    value: number;
}
export class Modifiable {
    private _modifiers: Modifier[] = [];
    public value: number = 0;

    constructor(private _base: number){
        this.value = _base;
    }

    private updateValue(): void {
        if(this._modifiers.length === 0) {
            this.value = this._base; 
            return;
        }
        const modifierValues = this._modifiers.map(m => m.value);
        this.value = this._base + modifierValues.reduce((a, b) => a + b) * this._base;
    }

    addModifier(modifier: Modifier): void {
        this._modifiers.push(modifier);
        this.updateValue();
    }

    removeModifier(key: string): void {
        this._modifiers = this._modifiers.filter(m => m.key !== key);
        this.updateValue();
    }
}