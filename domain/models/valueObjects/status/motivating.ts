import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Motivation } from '../parameters/motivation';
import { SpeedLevel } from '../parameters/speedLevel';

export class Motivating extends EventEmitter {
    private static readonly MODIFIER_KEY = 'motivating';
    private _activated: boolean = false;

    constructor(
        private speedLevel: SpeedLevel,
        private motivation: Motivation
    ){
        super();
        this.speedLevel.addListener('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(){
        if (this.speedLevel.isMotivating()) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    private activate(): void {
        if (this._activated) {
            return;
        }
        this._activated = true;
        this.motivation.addSpanMultiplier(Motivating.MODIFIER_KEY, 1);
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        if (!this._activated) {
            return;
        }
        this._activated = false;
        this.motivation.removeSpanMultiplier(Motivating.MODIFIER_KEY);
        this.emit('change', this._activated);
    }
}