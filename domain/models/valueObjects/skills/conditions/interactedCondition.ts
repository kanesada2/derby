import { Runner } from "@/domain/models/entities/runner";
import { SkillInteractor } from "../../skillInteractor";
import { Condition } from "../condition";

export class InteractedCondition extends Condition {
    constructor(
        runner: Runner,
        private interactor?: SkillInteractor
    ) {
        super(runner);
        this._active = true;
        if(!this.interactor){
            throw new Error('SkillInteractor is required.');
        }
        this._emitters.push(this.interactor);
    }

}