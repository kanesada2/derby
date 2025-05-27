import { Race } from '../entities/race';
import { Runner } from '../entities/runner';

export class NpcControl {
    private logged: boolean = false;
    private crawlWeight: number = 0;

    private pleasantPreference: number = 1;
    private concentratePreference: number = 1;
    private appropriatePreference: number = 1;

    constructor(
        private runner: Runner,
        private race: Race
    ) {
        this.determinePreferences();
        this.runner.location.addListener('change', this.play.bind(this));
    }

    private determinePreferences(): void {
        const pleasantAptitude = (this.runner.speedLevel.pleasantCenter - 1.4) * (this.runner.speedLevel.max.value - 1.8);
        if (pleasantAptitude < 0) {
            this.pleasantPreference *= pleasantAptitude * -100; // 最大で0.2×0.2なのでスケール合わせと、符号がマイナスになるときだけ加算するので
        }
    }

    private adjustWeight(): void {
        const nearest = this.race.getNearest(this.runner.location);
        const nearestDistance = nearest.location.current - this.runner.location.current;
        
        if (!this.runner.concentrated.activated && Math.abs(nearestDistance) < 20) {
            this.crawlWeight += 5 * nearestDistance * Math.random() * this.concentratePreference;
        }
        
        this.crawlWeight += 20 * (this.runner.speedLevel.pleasantCenter - this.runner.speedLevel.current.value) * Math.random() * this.pleasantPreference;
        
        const appropriateAmount = this.runner.health.current.value * this.runner.baseSpeed.current.value / (this.runner.location.max - this.runner.location.current) * 1.2;
        const appropriateSpeedLevel = (appropriateAmount + 4) / 5;
        this.crawlWeight += 20 * (appropriateSpeedLevel - this.runner.speedLevel.current.value) * Math.random() * this.appropriatePreference;
    }

    private play(): void {
        if (this.runner.location.isReached) {
            if (!this.logged) {
                this.log();
            }
            return;
        }
        this.adjustWeight();
        if (this.crawlWeight > 0) {
            this.runner.crawl();
        }
    }

    private log(): void {
        console.log(
            `${this.race.indexOf(this.runner) + 1},${this.runner.baseSpeed.current.value},` +
            `${this.runner.speedLevel.max},${this.runner.health.max},${this.runner.motivation.span},` +
            `${this.runner.motivation.current}`
        );
        this.logged = true;
    }
}