import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Health } from '../parameters/health';
import { SpeedLevel } from '../parameters/speedLevel';

export class Exhausted extends EventEmitter {
    private _activated: boolean = false;

    constructor(
        private health: Health,
        private speedLevel: SpeedLevel,
    ) {
        super();
        this.health.addListener('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(): void {
        if (this.health.isExhausted) {
            if(!this._activated) {
                this.activate();
            }
        }else{
            if(this._activated) {
                this.deactivate();
            }
        }
        
    }

    private activate(): void {
        this._activated = true;
        this.speedLevel.fixByExhausted();
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        this._activated = false;
        this.speedLevel.unfixByExhausted();
        this.emit('change', this._activated);
    }
}