import { Effect } from "../effect";

export class AddLocationEffect extends Effect {
    apply(): void {
        this.runner.location.increase(this.parameters[0]);
    }
    remove(): void {
        // 戻さない
    }

}