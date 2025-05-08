import EventEmitter from 'events';
import { Health } from '../health';
import { Motivation } from '../motivation';
import { SpeedLevel } from '../speedLevel';

export class Exhausted extends EventEmitter {
    private _activated: boolean = false;

    constructor(
        private health: Health,
        private speedLevel: SpeedLevel,
        private motivation: Motivation
    ) {
        super();
        this.health.on('change', this.check.bind(this));
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
        this.speedLevel.fixByExhausted(this.motivation.span);
        this.emit('change', this._activated);
    }
}