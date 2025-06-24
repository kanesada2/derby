import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Runner } from '../../entities/runner';

export abstract class Timing {
    static readonly activateEvent = 'activate';
    static readonly deactivateEvent = 'deactivate';

    protected _emitters: EventEmitter[] = [];

    constructor(
        protected runner: Runner
    ){}

    get emitters(): EventEmitter[]{
        return this._emitters;
    }

    initialize(): void {
        return; // 必要なら子クラスでオーバーライドする
    }
}