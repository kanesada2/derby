import { Effect } from "../effect";

export class ModifyCrawlHealthSpanEffect extends Effect {

    apply(): void {
        // 体力の減少量を変える
        this.runner.health.addCrawlSpanMultiplier(this.skillId, this.parameters[0]);
    }

    remove(): void {
        // 体力の減少量を戻す
        this.runner.health.removeCrawlSpanMultiplier(this.skillId);
    }
}