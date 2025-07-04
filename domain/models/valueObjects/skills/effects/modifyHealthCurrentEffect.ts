import { Effect } from "../effect";

export class ModifyHealthCurrentEffect extends Effect {

    apply(): void {
        // multiplierがcurrentの値の修正とは相性が悪い
        this.runner.health.current.value *= Math.max(1 + this.parameters[0], 0);
    }

    remove(): void {
    }
}