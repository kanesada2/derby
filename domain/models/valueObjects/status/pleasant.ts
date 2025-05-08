import EventEmitter from 'events';
import { SpeedLevel } from '../speedLevel';

export class Pleasant extends EventEmitter {
    private _activated: boolean = false;

    constructor(
        private speedLevel: SpeedLevel
    ) {
        super();
        this.speedLevel.on('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(): void {
        if (!this._activated && this.speedLevel.isPleasant()) {
            this.activate();
        }
        if (this._activated && !this.speedLevel.isPleasant()) {
            this.deactivate();
        }
    }

    private activate(): void {
        this._activated = true;
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        this._activated = false;
        this.emit('change', this._activated);
    }
}