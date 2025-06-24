import { Effect } from "../effect";

export class FixSpeedLevelToMaxRateEffect extends Effect {
    apply(): void {
        this.runner.speedLevel.current.value = this.runner.speedLevel.max.value * this.parameters[0];
        this.runner.speedLevel.emit('change', this.runner.speedLevel.current.value);
    }
    remove(): void {
    }
}