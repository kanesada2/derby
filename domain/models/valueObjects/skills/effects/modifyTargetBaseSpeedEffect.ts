import { Runner } from "@/domain/models/entities/runner";
import { Effect } from "../effect";

export class ModifyTargetBaseSpeedEffect extends Effect {
    private target: Runner | null = null;
    apply(): void {
        this.target = this.runner.concentrated.target;
        if(!this.target) return;
        this.target.baseSpeed.addCurrentMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        const target = this.target;
        this.target = null;
        if(!target) return;
        target.baseSpeed.removeCurrentMultiplier(this.skillId);
    }
}