import { Effect } from "../effect";

export class ModifyCrawlSpeedLevelEffect extends Effect {

    apply(): void {
        // カケアシレベルの増加量を変える
        this.runner.speedLevel.addSpanMultiplier(this.skillId, this.parameters[0]);
    }

    remove(): void {
        // カケアシレベルの増加量を元に戻す
        this.runner.speedLevel.removeSpanMultiplier(this.skillId);
    }
}