import { Effect } from "../effect";

export class AddHealthEffect extends Effect {
    apply(): void {
        // Healthのcurrentは初期値=基準値ではないため、addOffsetがそぐわない
        if(this.runner.health.current.value < -this.parameters[0]) {
            this.runner.health.current.value = 0;
            return;
        }
        this.runner.health.current.value += this.parameters[0];
    }
    remove(): void {
    }
}