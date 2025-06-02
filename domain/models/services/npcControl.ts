import { Race } from '../entities/race';
import { Runner } from '../entities/runner';
import { Health } from '../valueObjects/parameters/health';
import { SpeedLevel } from '../valueObjects/parameters/speedLevel';

export class NpcControl {
    private logged: boolean = false;
    private crawlWeight: number = 0;

    private pleasantPreference: number = 1;
    private concentratePreference: number = 1;
    private appropriatePreference: number = 1;
    private powerUpTimming: number = 1;
    private powerUpped: boolean = false;

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
        this.powerUpTimming = Math.random() * Race.DISTANCE;
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
        this.crawlWeight += 40 * (appropriateSpeedLevel - this.runner.speedLevel.current.value) * Math.random() * this.appropriatePreference;
        
        const ranRate = this.runner.location.current / this.runner.location.max;
        const rank = this.race.indexOf(this.runner) + 1;
        if(ranRate > 0.8){
            this.crawlWeight += (rank - this.race.runners.length) / 5; // 8割を超えたら順位を上げるような動き
        }
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
        if(!this.powerUpped && this.runner.location.current > this.powerUpTimming) {
            const healthRate = Math.random();
            this.runner.health.current.value += Health.MAX_BASE / 4 * healthRate;
            const speedRate = 1 - healthRate;
            this.runner.speedLevel.max.value += (SpeedLevel.MAX_BASE - SpeedLevel.MIN) / 4 * speedRate;
            this.powerUpped = true;
            console.log(this.runner.id + ' power up! ');
        }
    }

    private log(): void {
        console.log(
            `${this.runner.id} `+
            `${this.runner.speedLevel.max.value},${this.runner.health.max.value},${this.runner.health.current.value},`
        );
        this.logged = true;
    }
}