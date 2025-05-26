import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Motivation } from '../parameters/motivation';

export class Motivated extends EventEmitter {
    private _activated: boolean = false;

    constructor(
        private motivation: Motivation
    ) {
        super();
        this.motivation.addListener('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(): void {
        if (this._activated) {
            return;
        }
        if (this.motivation.isFilled) {
            this.activate();
        }
    }

    private activate(): void {
        this._activated = true;
        this.emit('change', this._activated);
    }
}