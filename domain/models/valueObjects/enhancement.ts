export class Enhancement {
    constructor(
        private _health: number,
        private _speedLevel: number,
        private _motivation: number,
        private _pleasantDiff: number
    ) {}

    get health(): number {
        return this._health;
    }
    get speedLevel(): number {
        return this._speedLevel;
    }
    get motivation(): number {
        return this._motivation;
    }

    get pleasantDiff(): number {
        return this._pleasantDiff;
    }
}