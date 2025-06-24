import { Enhancement } from "../valueObjects/enhancement";
import { SkillProp } from "../valueObjects/skill";

export const Element = {
    FIRE: 'FIRE',
    WATER: 'WATER',
    WIND: 'WIND',
    LIGHT: 'LIGHT',
    DARK: 'DARK',
    EARTH: 'EARTH',
    THUNDER: 'THUNDER',
} as const;

export type ElementType = typeof Element[keyof typeof Element];

export const ElementTierSpan = {
    FIRE: 3,
    WATER: 2,
    WIND: 4,
    LIGHT: 4,
    DARK: 3,
    EARTH: 2,
    THUNDER: 3,
}

export class Chip {
    constructor(
        private _id: string,
        private _name: string,
        private _rank: number,
        private _element: ElementType[],
        private _enhancement: Enhancement,
        private _skill: SkillProp[],
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
    get skill(): SkillProp[] {
        return this._skill;
    }
    get description(): string {
        return this._description;
    }
}

export class ChipCollection {

    constructor(private _chips: Chip[]){

    }
    get chips(): Chip[] {
        return this._chips;
    }

    get enhancement(): Enhancement {
        const aggregated = this._chips.reduce((acc, chip) => ({
            health: acc.health + chip.enhancement.health,
            speedLevel: acc.speedLevel + chip.enhancement.speedLevel,
            motivation: acc.motivation + chip.enhancement.motivation,}),
            { health: 0, speedLevel: 0, motivation: 0 }
        );

        return new Enhancement(aggregated.health, aggregated.speedLevel, aggregated.motivation);
    }

    get skills(): SkillProp[] {
        return this._chips.flatMap(chip => chip.skill);
    }

    get elementTiers(): { [k in ElementType]: number } {
        const counts: { [k in ElementType]: number } = {
            FIRE: 0,
            WATER: 0,
            WIND: 0,
            LIGHT: 0,
            DARK: 0,
            EARTH: 0,
            THUNDER: 0,
        };
        this._chips.forEach(chip => {
            chip.element.forEach(element => counts[element]++);
        });
        const tiers: { [k in ElementType]: number } = {
            FIRE: 0,
            WATER: 0,
            WIND: 0,
            LIGHT: 0,
            DARK: 0,
            EARTH: 0,
            THUNDER: 0,
        };
        Object.keys(counts).forEach(key => tiers[key as ElementType] = Math.floor(counts[key as ElementType] / ElementTierSpan[key as ElementType]));
        return tiers;
    }
}