import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export class RaceTime extends EventEmitter {
    private _fromStart: number = 0;
    private _beforeStart: number = 240;
    private _beforeSecond: number = 4;

    get fromStart(): number {
        return this._fromStart;
    }

    get beforeSecond(): number {
        return this._beforeSecond;
    }

    count(): void {
        this._fromStart++;
        if (this._beforeStart > 0) {
            this._beforeStart--;
        }
        const second = this._beforeStart === 0 ? 0 : Math.ceil(this._beforeStart / 60);
        if (this._beforeSecond > second) {
            this._beforeSecond = second;
            this.emit('change', this._beforeSecond);
        }
    }
}