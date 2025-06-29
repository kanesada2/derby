import { Effect } from "../effect";

export class FixPleasantEffect extends Effect {
    apply(): void {
        const fix = () => {
            this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
            this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
            const maxDiff = this.runner.speedLevel.max.value - this.runner.speedLevel.pleasantMax.value;
            const range = this.runner.speedLevel.pleasantMax.value - this.runner.speedLevel.pleasantMin.value;
            const min = this.runner.speedLevel.max.value - range;
            const minDiff = this.runner.speedLevel.pleasantMin.value - min;
            this.runner.speedLevel.pleasantMax.addOffset({key: this.skillId, value: maxDiff});
            this.runner.speedLevel.pleasantMin.addOffset({key: this.skillId, value: -minDiff});
        }
        fix();
        this.runner.motivating.addListener('change', ()=>{
            fix();
        })
        
    }
    remove(): void {
        this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
        this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
    }
}