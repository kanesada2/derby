import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Runner } from '../../entities/runner';

export abstract class Condition {
    protected _emitters: EventEmitter[] = [];
    protected _active: boolean = false;

    constructor(
        private runner: Runner
    ){

    }

    get emitters(): EventEmitter[]{
        return this._emitters;
    }
    get active(): boolean {
        return this._active;
    }

    initialize(): void {
        return; // 必要なら子クラスでオーバーライドする
    }
}