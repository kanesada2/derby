import { Race } from '../entities/race';
import { Runner } from '../entities/runner';

export class NpcControl {
    private logged: boolean = false;
    private crawlWeight: number = 0;

    private pleasantPreference: number = 1;
    private concentratePreference: number = 1;
    private appropriatePreference: number = 1;
    private powerUpRate: number = 0.5;

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
        this.powerUpRate = (Math.random() + Math.random()) / 2;
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
        if(ranRate > 0.5){
            this.powerUpRate = 1 - this.powerUpRate; // 前後半で逆転
        }
        if(ranRate > 0.7){
            this.crawlWeight += (rank - this.race.runners.length) / 5; // 7割を超えたら順位を上げるような動き
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
        if(Math.random() < 0.017 + this.race.indexOf(this.runner) / 1000) {
            if(Math.random() < this.powerUpRate) {
                this.runner.health.current.value += 80;
            }else{
                this.runner.speedLevel.max.value += 0.0015;

            }
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