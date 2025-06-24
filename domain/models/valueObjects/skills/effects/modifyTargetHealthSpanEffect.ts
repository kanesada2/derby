import { Runner } from "@/domain/models/entities/runner";
import { Effect } from "../effect";

export class ModifyTargetHealthSpanEffect extends Effect {
    private target: Runner | null = null;
    apply(): void {
        this.target = this.runner.concentrated.target;
        if(!this.target) return;
        this.target.health.addSpanMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        const target = this.target;
        this.target = null;
        if(!target) return;
        target.health.removeSpanMultiplier(this.skillId);
    }
}