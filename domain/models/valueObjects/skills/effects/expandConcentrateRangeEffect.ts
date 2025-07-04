import { Effect } from "../effect";

export class ExpandConcentrateRangeEffect extends Effect {
    apply(): void {
        this.runner.concentrated.addThresoldMultiplier(this.skillId, this.parameters[0]);
    }
    remove(): void {
        this.runner.concentrated.removeThresholdMultiplier(this.skillId);
    }

}