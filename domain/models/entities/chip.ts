import { Enhancement } from "../valueObjects/enhancement";
import { Skill } from "../valueObjects/skill";

export const Element = {
    FIRE: 'fire',
    WATER: 'water',
    WIND: 'wind',
    LIGHT: 'light',
    DARK: 'dark',
    EARTH: 'earth',
    THUNDER: 'thunder',
}
export type ElementType = typeof Element[keyof typeof Element];

export class Chip {
    constructor(
        private _id: string,
        private _name: string,
        private _rank: number,
        private _element: ElementType[],
        private _enhancement: Enhancement,
        private _skill: Skill[],
        private _description: string = '',
    ) {}

    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get rank(): number {
        return this._rank;
    }
    get cost(): number {
        return this._rank + 1;
    }
    get element(): ElementType[] {
        return this._element;
    }
    get enhancement(): Enhancement {
        return this._enhancement;
    }
    get skill(): Skill[] {
        return this._skill;
    }
    get description(): string {
        return this._description;
    }
}