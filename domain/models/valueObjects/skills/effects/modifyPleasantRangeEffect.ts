import { Effect } from "../effect";

export type PleasantRangeDirection = 1 | -1 | 0;

export class ModifyPleasntRangeEffect extends Effect {

    apply(): void {
        const range = this.runner.speedLevel.pleasantMax.value - this.runner.speedLevel.pleasantMin.value;
        const targetRange = range * (1 + this.parameters[1]);
        const diff = targetRange - range;
        if(this.parameters[0] === -1){
            this.runner.speedLevel.pleasantMax.addOffset({key: this.skillId, value: diff});
        }else if(this.parameters[0] === 1){
            this.runner.speedLevel.pleasantMin.addOffset({key: this.skillId, value: -diff});
        }else{
            this.runner.speedLevel.pleasantMax.addOffset({key: this.skillId, value: diff / 2});
            this.runner.speedLevel.pleasantMin.addOffset({key: this.skillId, value: -diff / 2});
        }
    }
    remove(): void {
       this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
       this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
    }
}