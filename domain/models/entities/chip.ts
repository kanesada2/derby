import { Modifier } from "../valueObjects/modifier";
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
        private _element: ElementType,
        private _modifier: Modifier,
        private _skill: Skill[],
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
    get element(): ElementType {
        return this._element;
    }
    get modifier(): Modifier {
        return this._modifier;
    }
    get skill(): Skill[] {
        return this._skill;
    }
}