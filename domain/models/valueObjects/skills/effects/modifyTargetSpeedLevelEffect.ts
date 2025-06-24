import { Runner } from "@/domain/models/entities/runner";
import { Effect } from "../effect";

export class ModifyTargetSpeedLevelEffect extends Effect {
    private target: Runner | null = null;
    apply(): void {
        this.target = this.runner.concentrated.target;
        if(!this.target) return;
        this.target.speedLevel.addCurrentMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        const target = this.target;
        this.target = null;
        if(!target) return;
        target.speedLevel.removeCurrentMultiplier(this.skillId);
    }
}