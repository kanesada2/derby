import EventEmitter from 'events';
import { NpcControl } from '../services/npcControl';
import { Location } from '../valueObjects/location';
import { RaceState } from '../valueObjects/race_state';
import { RaceTime } from '../valueObjects/race_time';
import { Runner } from './runner';

export class Race extends EventEmitter {
    private static readonly RUNNERS_COUNT = 6;
    static readonly DISTANCE = 144000; // 2400 * 60

    private _raceTime: RaceTime;
    private _state: RaceState = RaceState.pending;
    private _runners: Runner[] = [];
    private playable!: Runner;

    constructor() {
        super();
        this._raceTime = new RaceTime();
        this._raceTime.on('change', this.checkStart.bind(this));
    }

    get first(): Runner {
        return this._runners[0];
    }

    get raceTime(): RaceTime {
        return this._raceTime;
    }

    get isFinished(): boolean {
        return this._state === RaceState.finished;
    }

    indexOf(runner: Runner): number {
        return this._runners.indexOf(runner);
    }

    getNearest(location: Location): Runner {
        let nearest = this._runners[0];
        let nearestDistance = Race.DISTANCE;

        this._runners.forEach((runner: Runner) => {
            const distance = Math.abs(location.current - runner.location.current);
            if (distance === 0) {
                // 自分自身
                return;
            }
            if (distance > nearestDistance) {
                return;
            }
            nearest = runner;
            nearestDistance = distance;
        });

        return nearest;
    }

    getPlayableRunner(): Runner {
        return this.playable;
    }

    addPlayableRunner(runner: Runner): void {
        this._runners.push(runner);
        this.playable = runner;
    }

    summonRunners(): void {
        for (let i = this._runners.length; i < Race.RUNNERS_COUNT; i++) {
            const runner = Runner.create(this);
            new NpcControl(runner);
            this._runners.push(runner);
        }
        this._runners.sort(() => Math.random() - 0.5); // shuffle
        if (!this.playable) {
            this.playable = this.first;
        }
    }

    private checkStart(): void {
        if (this._raceTime.beforeSecond > 0) {
            return;
        }
        this.start();
    }

    private start(): void {
        this.activateRunners();
        this._state = RaceState.running;
        this.emit('change', this._state);
    }

    private activateRunners(): void {
        this._runners.forEach(runner => runner.activate());
    }

    update(dt: number): void {
        if (this.playable.location.isReached) {
            if (!this.isFinished) {
                this._state = RaceState.finished;
                this.emit('change', this._state);
            }
            return;
        }

        if (this._runners[Race.RUNNERS_COUNT - 1].location.isReached) {
            //reset();
            return;
        }

        this._raceTime.count();
        this._runners.sort((a, b) => b.location.current - a.location.current);
        this._runners.forEach(runner => {
            runner.run();
        });
    }

    reset(): void {
        this._runners.splice(0, Race.RUNNERS_COUNT);
        this.summonRunners();
        this.start();
    }
}