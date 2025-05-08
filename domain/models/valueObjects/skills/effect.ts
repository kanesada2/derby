import { Runner } from "../../entities/runner";

export interface Effect {
    apply(runner: Runner): void;
}