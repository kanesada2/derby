import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { Health } from '../parameters/health';
import { SpeedLevel } from '../parameters/speedLevel';

export class Pleasant extends EventEmitter {
    private static readonly MODIFIER_KEY = 'pleasant';
    private static readonly HEALTH_MODIFIER = -0.3;

    private _activated: boolean = false;

    constructor(
        private speedLevel: SpeedLevel,
        private health: Health
    ) {
        super();
        this.speedLevel.addListener('change', this.check.bind(this));
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
        this.health.addSpanMultiplier(Pleasant.MODIFIER_KEY, Pleasant.HEALTH_MODIFIER);
        this.health.addCrawlSpanMultiplier(Pleasant.MODIFIER_KEY, -1);
        this.emit('change', this._activated);
    }

    private deactivate(): void {
        this._activated = false;
        this.health.removeSpanMultiplier(Pleasant.MODIFIER_KEY);
        this.health.removeCrawlSpanMultiplier(Pleasant.MODIFIER_KEY);
        this.emit('change', this._activated);
    }
}