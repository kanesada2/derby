import { Effect } from "../effect";

export class ModifyMotivatingRangeEffect extends Effect {
    apply(): void {
        this.runner.speedLevel.addMotivatingRangeMultiplier(this.skillId, this.parameters[0]);
    }

    remove(): void {
        this.runner.speedLevel.removeMotivatingRangeMultiplier(this.skillId);
    }

}