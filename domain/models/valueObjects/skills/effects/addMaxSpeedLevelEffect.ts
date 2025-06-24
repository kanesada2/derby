import { Effect } from "../effect";

export class AddMaxSpeedLevelEffect extends Effect {
    apply(): void {
        this.runner.speedLevel.max.addOffset({key: this.skillId, value: this.parameters[0]});
    }
    remove(): void {
        this.runner.speedLevel.max.removeOffset(this.skillId);
    }

}