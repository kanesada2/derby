import { Effect } from "../effect";

export class AddTargetMaxSpeedLevelEffect extends Effect {
    apply(): void {
        this.runner.concentrated.target?.speedLevel.addMaxOffset(this.skillId, this.parameters[0]);
    }
    remove(): void {
        this.runner.concentrated.target?.speedLevel.removeMaxOffset(this.skillId);
    }

}