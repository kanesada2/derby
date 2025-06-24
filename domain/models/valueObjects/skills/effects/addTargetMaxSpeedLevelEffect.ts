import { Effect } from "../effect";

export class AddTargetMaxSpeedLevelEffect extends Effect {
    apply(): void {
        this.runner.concentrated.target?.speedLevel.max.addOffset({key: this.skillId, value: this.parameters[0]});
    }
    remove(): void {
        this.runner.concentrated.target?.speedLevel.max.removeOffset(this.skillId);
    }

}