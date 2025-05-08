import EventEmitter from 'events';
import { Race } from '../../entities/race';
import { Location } from '../location';

export class Concentrated extends EventEmitter {
    private static readonly THRESHOLD = 300;
    private _activated: boolean = false;

    constructor(
        private _race: Race,
        private _location: Location
    ) {
        super();
        this._location.on('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    private check(): void {
        if (Math.abs(this._location.current - this._race.getNearest(this._location).location.current) > Concentrated.THRESHOLD) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    private activate(): void {
        if (this._activated) {
            return;
        }
        this._activated = true;
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        if (!this._activated) {
            return;
        }
        this._activated = false;
        this.emit('change', this._activated);
    }
}