import { Effect } from "../effect";

export class ModifyMotivationSpanEffect extends Effect {
    apply(): void {
        this.runner.motivation.addSpanMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        this.runner.motivation.removeSpanMultiplier(this.skillId);
    }
}