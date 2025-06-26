import { Effect } from "../effect";

export class AddMaxSpeedLevelEffect extends Effect {
    apply(): void {
        this.runner.speedLevel.addMaxOffset(this.skillId, this.parameters[0]);
    }
    remove(): void {
        this.runner.speedLevel.removeMaxOffset(this.skillId);
    }

}