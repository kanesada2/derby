import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Race } from '../../entities/race';
import { Runner } from '../../entities/runner';
import { Location } from '../location';
import { Health } from '../parameters/health';

export class Concentrated extends EventEmitter {
    private static readonly MODIFIER_KEY = 'concentrated';
    private static readonly HEALTH_MODIFIER = -0.3;

    private static readonly THRESHOLD = 300;
    private _activated: boolean = false;
    private _target: Runner | null = null;

    constructor(
        private _race: Race,
        private _location: Location,
        private _health: Health,
    ) {
        super();
        this._location.addListener('change', this.check.bind(this));
    }

    get activated(): boolean {
        return this._activated;
    }

    get target(): Runner | null {
        return this._target;
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
        this._health.addSpanMultiplier(Concentrated.MODIFIER_KEY, Concentrated.HEALTH_MODIFIER);
        this._health.addCrawlSpanMultiplier(Concentrated.MODIFIER_KEY, -1);
        this._target = this._race.getNearest(this._location);
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        if (!this._activated) {
            return;
        }
        this._activated = false;
        this._target = null;
        this._health.removeSpanMultiplier(Concentrated.MODIFIER_KEY);
        this._health.removeCrawlSpanMultiplier(Concentrated.MODIFIER_KEY);
        this.emit('change', this._activated);
    }


}