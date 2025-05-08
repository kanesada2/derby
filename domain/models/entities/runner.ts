import { BaseSpeed } from '../valueObjects/baseSpeed';
import { Health } from '../valueObjects/health';
import { Location } from '../valueObjects/location';
import { Motivation } from '../valueObjects/motivation';
import { Speed } from '../valueObjects/speed';
import { SpeedLevel } from '../valueObjects/speedLevel';
import { Concentrated } from '../valueObjects/status/concentrated';
import { Exhausted } from '../valueObjects/status/exhausted';
import { Motivated } from '../valueObjects/status/motivated';
import { Pleasant } from '../valueObjects/status/pleasant';
import { Race } from './race';

export class Runner {
    private _playable: boolean = false;

    constructor(
        private _race: Race,
        private _location: Location,
        private _baseSpeed: BaseSpeed,
        private _motivation: Motivation,
        private _speedLevel: SpeedLevel,
        private _health: Health,
        private _speed: Speed,
        private _motivated: Motivated,
        private _concentrated: Concentrated,
        private _pleasant: Pleasant,
        private _exhausted: Exhausted
    ) {}

    get race(): Race {
        return this._race;
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

    get concentrated(): Concentrated {
        return this._concentrated;
    }

    get pleasant(): Pleasant {
        return this._pleasant;
    }

    get exhausted(): Exhausted {
        return this._exhausted;
    }

    static create(race: Race): Runner {
        const speedLevel = new SpeedLevel();
        const motivation = new Motivation(speedLevel);
        const motivated = new Motivated(motivation);
        const baseSpeed = new BaseSpeed(motivated);
        const pleasant = new Pleasant(speedLevel);
        const speed = new Speed(baseSpeed, speedLevel);
        const location = new Location(Race.DISTANCE, speed);
        const concentrated = new Concentrated(race, location);
        const health = new Health(speedLevel, concentrated, motivated, pleasant);
        const exhausted = new Exhausted(health, speedLevel, motivation);

        return new Runner(
            race, location, baseSpeed, motivation, speedLevel, health, speed,
            motivated, concentrated, pleasant, exhausted
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
        this._health.decreaseByCrawl();
        this._speedLevel.increaseByCrawl();
    }
}