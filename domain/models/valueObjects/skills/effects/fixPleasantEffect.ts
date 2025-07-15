import { Effect } from "../effect";

export class FixPleasantEffect extends Effect {
    private max = this.runner.speedLevel.max.value;
    private motivatingMin = this.runner.speedLevel.motivatingMin;
    apply(): void {
        const fix = () => {
            this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
            this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
            const maxDiff = this.runner.speedLevel.max.value - this.runner.speedLevel.pleasantMax.value;
            const minDiff = this.runner.speedLevel.motivatingMin - this.runner.speedLevel.pleasantMin.value;
            this.runner.speedLevel.pleasantMax.addOffset({key: this.skillId, value: maxDiff});
            this.runner.speedLevel.pleasantMin.addOffset({key: this.skillId, value: minDiff});
        }
        fix();
        this.runner.location.addListener('change', ()=>{
            if(this.runner.speedLevel.max.value === this.max || this.runner.speedLevel.motivatingMin === this.motivatingMin){
                return;
            }
            this.max = this.runner.speedLevel.max.value;
            this.motivatingMin = this.runner.speedLevel.motivatingMin;
            fix();
        })
        
    }
    remove(): void {
        this.runner.speedLevel.pleasantMax.removeOffset(this.skillId);
        this.runner.speedLevel.pleasantMin.removeOffset(this.skillId);
    }
}