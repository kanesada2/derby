import { RistrictionNames } from '@/constants/SkillNames';
import { Location } from '../valueObjects/location';
import { BaseSpeed } from '../valueObjects/parameters/baseSpeed';
import { Health } from '../valueObjects/parameters/health';
import { Motivation } from '../valueObjects/parameters/motivation';
import { SpeedLevel } from '../valueObjects/parameters/speedLevel';
import { Skill } from '../valueObjects/skill';
import { SkillInteractor } from '../valueObjects/skillInteractor';
import { InteractedCondition } from '../valueObjects/skills/conditions/interactedCondition';
import { AddHealthEffect } from '../valueObjects/skills/effects/addHealthEffect';
import { AddMaxSpeedLevelEffect } from '../valueObjects/skills/effects/addMaxSpeedLevelEffect';
import { FixPleasantEffect } from '../valueObjects/skills/effects/fixPleasantEffect';
import { ModifyBaseSpeedEffect } from '../valueObjects/skills/effects/modifybaseSpeedEffect';
import { ModifyDecreaseSpanEffect } from '../valueObjects/skills/effects/modifyDecreaseSpanEffect';
import { ModifyHealthCurrentEffect } from '../valueObjects/skills/effects/modifyHealthCurrentEffect';
import { ModifyHealthSpanEffect } from '../valueObjects/skills/effects/modifyHealthSpanEffect';
import { ModifyMotivationSpanEffect } from '../valueObjects/skills/effects/modifyMotivationSpanEffect';
import { ModifyPleasntRangeEffect } from '../valueObjects/skills/effects/modifyPleasantRangeEffect';
import { Ristriction } from '../valueObjects/skills/ristriction';
import { AlwaysTiming } from '../valueObjects/skills/timings/alwaysTiming';
import { ConcentratedTiming } from '../valueObjects/skills/timings/concentratedTiming';
import { Speed } from '../valueObjects/speed';
import { Concentrated } from '../valueObjects/status/concentrated';
import { Exhausted } from '../valueObjects/status/exhausted';
import { Motivated } from '../valueObjects/status/motivated';
import { Motivating } from '../valueObjects/status/motivating';
import { Pleasant } from '../valueObjects/status/pleasant';
import { ChipCollection, Element, ElementType } from './chip';
import { Race } from './race';

export class Runner {
    private _playable: boolean = false;

    constructor(
        private _id: number,
        private _location: Location,
        private _baseSpeed: BaseSpeed,
        private _motivation: Motivation,
        private _speedLevel: SpeedLevel,
        private _health: Health,
        private _speed: Speed,
        private _motivated: Motivated,
        private _motivating: Motivating,
        private _concentrated: Concentrated,
        private _pleasant: Pleasant,
        private _exhausted: Exhausted,
        private _skills: Map<string, Skill>,
        private _skillInteractors: Map<ElementType, SkillInteractor> = new Map<ElementType, SkillInteractor>()
    ) {}

    get id(): number {
        return this._id;
    }

    get baseSpeed(): BaseSpeed {
        return this._baseSpeed;
    }

    get health(): Health {
        return this._health;
    }

    get motivation(): Motivation {
        return this._motivation;
    }

    get speed(): Speed {
        return this._speed;
    }

    get speedLevel(): SpeedLevel {
        return this._speedLevel;
    }

    get location(): Location {
        return this._location;
    }

    get motivated(): Motivated {
        return this._motivated;
    }

    get motivating(): Motivating {
        return this._motivating;
    }

    get concentrated(): Concentrated {
        return this._concentrated;
    }

    get pleasant(): Pleasant {
        return this._pleasant;
    }

    get exhausted(): Exhausted {
        return this._exhausted;
    }

    get skillInteractors(): Map<ElementType, SkillInteractor> {
        return this._skillInteractors;
    }

    interactElementSkill(skillName: ElementType): void {
        const interactor = this._skillInteractors.get(skillName);
        if (interactor) {
            interactor.interact();
            this.motivation.current.value -= interactor.requirements;
        }
    }

    static create(race: Race, id: number): Runner {
        const health = new Health();
        const speedLevel = new SpeedLevel(health);
        const motivation = new Motivation(speedLevel);
        const motivated = new Motivated(motivation);
        const motivating = new Motivating(speedLevel, motivation);
        const baseSpeed = new BaseSpeed();
        const pleasant = new Pleasant(speedLevel, health);
        const speed = new Speed(baseSpeed, speedLevel);
        const location = new Location(Race.DISTANCE, speed);
        const concentrated = new Concentrated(race, location, health);
        const exhausted = new Exhausted(health, speedLevel);

        return new Runner(
            id,location, baseSpeed, motivation, speedLevel, health, speed,
            motivated, motivating, concentrated, pleasant, exhausted, new Map<string, Skill>()
        );
    }

    static createWithChips(chips: ChipCollection, race: Race, id: number): Runner {
        const health = new Health(chips.enhancement.health);
        const speedLevel = new SpeedLevel(health, [chips.enhancement.speedLevel, chips.enhancement.pleasantDiff]);
        const motivation = new Motivation(speedLevel, chips.enhancement.motivation);
        const motivated = new Motivated(motivation);
        const motivating = new Motivating(speedLevel, motivation);
        const baseSpeed = new BaseSpeed(true);
        const pleasant = new Pleasant(speedLevel, health);
        const speed = new Speed(baseSpeed, speedLevel);
        const location = new Location(Race.DISTANCE, speed);
        const concentrated = new Concentrated(race, location, health);
        const exhausted = new Exhausted(health, speedLevel);

        const runner = new Runner(
            id,location, baseSpeed, motivation, speedLevel, health, speed,
            motivated, motivating, concentrated, pleasant, exhausted, new Map<string, Skill>()
        );
        runner.addElementSkills(chips);

        chips.skills.forEach(skill => {
            const effects = skill.effects.map(effect => new effect.name(skill.name, runner, effect.parameters));
            if(!skill.ristriction) {
                skill.ristriction = RistrictionNames.ristriction;
            }
            runner._skills.set(skill.name, new Skill(new skill.condition(runner), new skill.timing(runner), effects, new skill.ristriction(runner)));
        });

        return runner;
    }

    addElementSkills(chips: ChipCollection): void {
        let interactor: SkillInteractor | undefined;
        if(chips.elementTiers.FIRE > 0){
            interactor = new SkillInteractor(Element.FIRE, chips.elementTiers.FIRE, this.motivation);
            this._skills.set(Element.FIRE, new Skill(
                new InteractedCondition(this, interactor),
                new ConcentratedTiming(this),
                [
                    new ModifyBaseSpeedEffect(Element.FIRE + chips.elementTiers.FIRE, this, [chips.elementTiers.FIRE * 0.03]),
                    new ModifyDecreaseSpanEffect(Element.FIRE + chips.elementTiers.FIRE, this, [-1]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.FIRE, interactor);
        }
        if(chips.elementTiers.WATER > 0){
            interactor = new SkillInteractor(Element.WATER, chips.elementTiers.WATER, this.motivation);
            this._skills.set(Element.WATER, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new ModifyHealthSpanEffect(Element.WATER + chips.elementTiers.WATER, this, [chips.elementTiers.WATER * 0.06]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.WATER, interactor);
        }
        if(chips.elementTiers.THUNDER > 0){
            interactor = new SkillInteractor(Element.THUNDER, chips.elementTiers.THUNDER, this.motivation);
            this._skills.set(Element.THUNDER, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new AddMaxSpeedLevelEffect(Element.THUNDER + chips.elementTiers.THUNDER, this, [0.1 * chips.elementTiers.THUNDER]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.THUNDER, interactor);
        }
        if(chips.elementTiers.EARTH > 0){
            interactor = new SkillInteractor(Element.EARTH, chips.elementTiers.EARTH, this.motivation);
            this._skills.set(Element.EARTH, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new AddHealthEffect(Element.EARTH + chips.elementTiers.EARTH, this, [chips.elementTiers.EARTH * 600]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.EARTH, interactor);
        }
        if(chips.elementTiers.WIND > 0){
            interactor = new SkillInteractor(Element.WIND, chips.elementTiers.WIND, this.motivation);
            this._skills.set(Element.WIND, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new FixPleasantEffect(Element.WIND + chips.elementTiers.WIND, this, []),
                    new ModifyPleasntRangeEffect(Element.WIND + chips.elementTiers.WIND, this, [-1, chips.elementTiers.WIND * 0.15]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.WIND, interactor);
        }
        if(chips.elementTiers.LIGHT > 0){
            interactor = new SkillInteractor(Element.LIGHT, chips.elementTiers.LIGHT, this.motivation);
            this._skills.set(Element.LIGHT, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new ModifyMotivationSpanEffect(Element.LIGHT + chips.elementTiers.LIGHT, this, [chips.elementTiers.LIGHT]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.LIGHT, interactor);
        }
        if(chips.elementTiers.DARK > 0){
            interactor = new SkillInteractor(Element.DARK, chips.elementTiers.DARK, this.motivation);
            this._skills.set(Element.DARK, new Skill(
                new InteractedCondition(this, interactor),
                new AlwaysTiming(this),
                [
                    new ModifyBaseSpeedEffect(Element.DARK + chips.elementTiers.DARK, this, [chips.elementTiers.DARK * 0.08]),
                    new ModifyHealthCurrentEffect(Element.DARK + chips.elementTiers.DARK, this, [-0.5 / chips.elementTiers.DARK]),
                ],
                new Ristriction(this)
            ));
            this._skillInteractors.set(Element.DARK, interactor);
        }
    }

    activate(): void {
        this._playable = true;
    }

    deactivate(): void {
        this._playable = false;
    }

    run(): void {
        if (!this._playable) {
            return;
        }
        this.location.increase();
        this._health.decreaseByRun();
        this._speedLevel.decreaseClock();
    }

    crawl(): void {
        if (this.exhausted.activated || !this._playable) {
            return;
        }
        this._speedLevel.increaseByCrawl();
        this._health.decreaseByCrawl();
    }
}