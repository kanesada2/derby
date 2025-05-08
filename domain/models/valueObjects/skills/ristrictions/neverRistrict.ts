import { Ristriction } from "../ristriction";

export class NeverRistrict extends Ristriction {

    get activated(): boolean {
        return false;
    }
}