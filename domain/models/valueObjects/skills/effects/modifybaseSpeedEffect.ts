import { Runner } from "@/domain/models/entities/runner";
import { Effect } from "../effect";

export class ModifyBaseSpeedEffect extends Effect {
    constructor(
        protected skillId: string,
        protected runner: Runner,
        protected parameters: number[],
    ) {
        super(skillId, runner, parameters);
    }
    apply(): void {
        // 基本速度を増加させる
        this.runner.baseSpeed.addCurrentMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        // 基本速度を元に戻す
        this.runner.baseSpeed.removeCurrentMultiplier(this.skillId);
    }
}