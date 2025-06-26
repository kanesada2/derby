import { Modifiable } from '../modifiable';
import { Parameter } from '../parameter';
import { Health } from './health';

export class SpeedLevel extends Parameter {
    static readonly MIN = 1.0;
    static readonly MAX_MAX = 2.0;
    static readonly MAX_BASE = 1.4;
    static readonly MAX_AMPLIFIER_MAX = 0.4;
    static readonly INCREASE_SPAN = 0.1;
    static readonly DECRASE_TICKS = 300;
    static readonly PLEASANT_MAX_MIN = 1.2;
    static readonly EXHAUSTED_BASE = 0.5;
    static readonly MODIFIER_KEY = 'speedLevel';

    pleasantMin: Modifiable = new Modifiable(1);
    pleasantMax: Modifiable = new Modifiable(1);
    private _motivatingMin: number = 1;
    private _exhausted: boolean = false;
    private _lastSpeedLv: number = 1;

    private _decreaseSpan: Modifiable;

    constructor(private health:Health, enhancement: number|null = null) {
        super(SpeedLevel.MAX_MAX, SpeedLevel.MIN, SpeedLevel.INCREASE_SPAN);
        this.determineParameters(enhancement);
        this._decreaseSpan = new Modifiable(this._span.value / SpeedLevel.DECRASE_TICKS);
    }

    get pleasantCenter(): number {
        return (this.pleasantMax.value - this.pleasantMin.value) + SpeedLevel.MIN;
    }

    get motivatingMin(): number {
        return this._motivatingMin;
    }

    static calculateMaxWithEnhancement(enhancement: number): number {
        return (SpeedLevel.MAX_BASE - SpeedLevel.MIN) * (1 + enhancement / 100) + SpeedLevel.MIN;
    }

    private determineParameters(enhancement: number|null): void {
        if(enhancement !== null) {
            this._max = new Modifiable(SpeedLevel.calculateMaxWithEnhancement(enhancement));
        } else {
            const lotCountBase = 10;
            const lotList: number[] = [];
            
            for (let i = 0; i < lotCountBase; i++) {
                lotList.push(Math.random());
            }
            
            lotList.sort((a, b) => b - a);
            // 乱数10個の最小値~乱数80個の10番目に大きい数
            this._max = new Modifiable(SpeedLevel.MAX_BASE + SpeedLevel.MAX_AMPLIFIER_MAX * lotList[lotCountBase - 1]);
        }
        this._motivatingMin = this._max.value - SpeedLevel.INCREASE_SPAN;
        
        const randomizer = (this._motivatingMin - SpeedLevel.PLEASANT_MAX_MIN) * Math.random();
        this.pleasantMax = new Modifiable(SpeedLevel.PLEASANT_MAX_MIN + randomizer);
        this.pleasantMin = new Modifiable(this.pleasantMax.value - SpeedLevel.INCREASE_SPAN);
    }

    private updateMotivatingMin(): void {
        this._motivatingMin = this._max.value - SpeedLevel.INCREASE_SPAN;
    }

    isPleasant(): boolean {
        return this.pleasantMin.value <= this._current.value && this._current.value <= this.pleasantMax.value;
    }

    isMotivating(): boolean {
        return this._current.value >= this._motivatingMin;
    }

    decreaseClock(): void {
        if (this._exhausted) {
            return;
        }
        this._current.value = Math.max(this._current.value - this._decreaseSpan.value, SpeedLevel.MIN);
        this.health.removeSpanMultiplier(SpeedLevel.MODIFIER_KEY);
        this.health.addSpanMultiplier(SpeedLevel.MODIFIER_KEY, this.calcHealthMultiplier());
        this.health.removeCrawlSpanMultiplier(SpeedLevel.MODIFIER_KEY);
        this.health.addCrawlSpanMultiplier(SpeedLevel.MODIFIER_KEY ,this.calcHealthCrawlSpan());
        this.emit('change', this._current.value);
    }

    increaseByCrawl(): void {
        if (this._exhausted) {
            return;
        }
        this._current.value = Math.min(this._current.value + this._span.value, this._max.value);
        this.health.addSpanMultiplier(SpeedLevel.MODIFIER_KEY, this.calcHealthMultiplier());
        this.health.removeCrawlSpanMultiplier(SpeedLevel.MODIFIER_KEY);
        this.health.addCrawlSpanMultiplier(SpeedLevel.MODIFIER_KEY ,this.calcHealthCrawlSpan());
        this.emit('change', this._current.value);
    }

    private calcHealthMultiplier(): number {
        return (this._current.value - SpeedLevel.MIN) * 5;
    }

    private calcHealthCrawlSpan(): number {
        return SpeedLevel.MAX_MAX / this.current.value;
    }   

    fixByExhausted(): void {
        this._lastSpeedLv = this._current.value;
        this._current.value = SpeedLevel.EXHAUSTED_BASE;
        this._exhausted = true;
        this.emit('change', this._current.value);
    }

    unfixByExhausted(): void {
        this._exhausted = false;
        this._current.value = this._lastSpeedLv;
        this.emit('change', this._current.value);
    }
    addMaxMultiplier(key: string, value: number): void {
        super.addMaxMultiplier(key, value);
        this.updateMotivatingMin();
    }

    removeMaxMultiplier(key: string): void {
        super.removeMaxMultiplier(key);
        this.updateMotivatingMin();
    }

    addMaxOffset(key: string, value: number): void {
        this._max.addOffset({key, value});
        this.updateMotivatingMin();
    }

    removeMaxOffset(key: string): void {
        this._max.removeOffset(key);
        this.updateMotivatingMin();
    }

    addDecreaseSpanMultiplier(key: string, value: number): void {
        this._decreaseSpan.addMultiplier({key, value});
    }

    removeDecreaseSpanMultiplier(key: string): void {
        this._decreaseSpan.removeMultiplier(key);
    }
}