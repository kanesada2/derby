import { Effect } from "../effect";

export type PleasantRangeDirection = 1 | -1 | 0;

export class MovePleasntRangeEffect extends Effect {

    apply(): void {
       this.runner.speedLevel.pleasantMax.addOffset({key: this.skillId, value: this.parameters[0]});
       this.runner.speedLevel.pleasantMin.addOffset({key: this.skillId, value: this.parameters[0]});
    }
    remove(): void {
       this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
       this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
    }
}