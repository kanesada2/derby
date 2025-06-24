import { Effect } from "../effect";

export class ModifyHealthSpanEffect extends Effect {

    apply(): void {
        this.runner.health.addSpanMultiplier(this.skillId, this.parameters[0]);
    }

    remove(): void {
        this.runner.health.removeSpanMultiplier(this.skillId);
    }
}