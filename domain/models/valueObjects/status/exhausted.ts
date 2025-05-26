import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Health } from '../parameters/health';
import { Motivation } from '../parameters/motivation';
import { SpeedLevel } from '../parameters/speedLevel';

export class Exhausted extends EventEmitter {
    private _activated: boolean = false;

    constructor(
        private health: Health,
        private speedLevel: SpeedLevel,
        private motivation: Motivation
    ) {
        super();
        this.health.addListener('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(): void {
        if (this._activated) {
            return;
        }
        if (!this.health.isExhausted) {
            return;
        }
        this.activate();
    }

    private activate(): void {
        this._activated = true;
        this.speedLevel.fixByExhausted(this.motivation.span.value);
        this.emit('change', this._activated);
    }
}