import { Runner } from "../../entities/runner";

export abstract class Effect {
    constructor(
        protected skillId: string,
        protected runner: Runner,
        protected parameters: number[],
    ) {
    }

    abstract apply(): void;
    abstract remove(): void;
}