import { Runner } from "@/domain/models/entities/runner";
import { Effect } from "../effect";

export class ModifyDecreaseSpanEffect extends Effect {
    constructor(
        protected skillId: string,
        protected runner: Runner,
        protected parameters: number[],
    ) {
        super(skillId, runner, parameters);
    }

    apply(): void {
        // スキルの効果で減少するスパンを増加させる
        this.runner.speedLevel.addDecreaseSpanMultiplier(this.skillId, this.parameters[0]);
    }

    remove(): void {
        // スキルの効果で減少するスパンを元に戻す
        this.runner.speedLevel.removeDecreaseSpanMultiplier(this.skillId);
    }
}