import { Effect } from "../effect";

export class AddMotivationEffect extends Effect {
    apply(): void {
        if(this.runner.motivation.current.value < -this.parameters[0]) {
            this.runner.motivation.current.value = 0;
            return;
        }
        this.runner.motivation.current.value += this.parameters[0];
    }
    remove(): void {
    }

}