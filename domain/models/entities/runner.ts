import { Enhancement } from '../valueObjects/enhancement';
import { Location } from '../valueObjects/location';
import { BaseSpeed } from '../valueObjects/parameters/baseSpeed';
import { Health } from '../valueObjects/parameters/health';
import { Motivation } from '../valueObjects/parameters/motivation';
import { SpeedLevel } from '../valueObjects/parameters/speedLevel';
import { Speed } from '../valueObjects/speed';
import { Concentrated } from '../valueObjects/status/concentrated';
import { Exhausted } from '../valueObjects/status/exhausted';
import { Motivated } from '../valueObjects/status/motivated';
import { Motivating } from '../valueObjects/status/motivating';
import { Pleasant } from '../valueObjects/status/pleasant';
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
        private _exhausted: Exhausted
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
        const exhausted = new Exhausted(health, speedLevel, motivation);

        return new Runner(
            id,location, baseSpeed, motivation, speedLevel, health, speed,
            motivated, motivating, concentrated, pleasant, exhausted
        );
    }

    static createWithEnhancement(enhancement : Enhancement, race: Race, id: number): Runner {
        const health = new Health(enhancement.health);
        const speedLevel = new SpeedLevel(health, enhancement.speedLevel);
        const motivation = new Motivation(speedLevel, enhancement.motivation);
        const motivated = new Motivated(motivation);
        const motivating = new Motivating(speedLevel, motivation);
        const baseSpeed = new BaseSpeed(true);
        const pleasant = new Pleasant(speedLevel, health);
        const speed = new Speed(baseSpeed, speedLevel);
        const location = new Location(Race.DISTANCE, speed);
        const concentrated = new Concentrated(race, location, health);
        const exhausted = new Exhausted(health, speedLevel, motivation);

        return new Runner(
            id,location, baseSpeed, motivation, speedLevel, health, speed,
            motivated, motivating, concentrated, pleasant, exhausted
        );
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