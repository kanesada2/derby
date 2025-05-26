import { Parameter } from '../parameter';
import { Health } from './health';

export class SpeedLevel extends Parameter {
    static readonly MIN = 1.0;
    static readonly MAX_MAX = 2.0;
    static readonly MAX_BASE = 1.4;
    static readonly MAX_AMPLIFIER_MAX = 0.4;
    static readonly DECREASE_SPAN = 0.001;
    static readonly INCREASE_SPAN = 0.1;
    static readonly UNIT = 0.2;
    static readonly PLEASANT_MAX_MIN = 1.2;
    static readonly EXHAUSTED_BASE = 0.5;
    static readonly MODIFIER_KEY = 'speedLevel';

    private _pleasantMin: number = 1;
    private _pleasantMax: number = 1;
    private _motivatingMin: number = 1;
    private _exhausted: boolean = false;

    constructor(private health:Health) {
        super(SpeedLevel.MAX_MAX, SpeedLevel.MIN, SpeedLevel.INCREASE_SPAN);
        this.determineParameters();
    }

    get pleasantCenter(): number {
        return (this._pleasantMax - this._pleasantMin) + SpeedLevel.MIN;
    }

    get motivatingMin(): number {
        return this._motivatingMin;
    }

    private determineParameters(): void {
        const lotCountBase = 10;
        const lotList: number[] = [];
        
        for (let i = 0; i < lotCountBase; i++) {
            lotList.push(Math.random());
        }
        
        lotList.sort((a, b) => b - a);
        // 乱数10個の最小値~乱数80個の10番目に大きい数
        this._max.value = SpeedLevel.MAX_BASE + SpeedLevel.MAX_AMPLIFIER_MAX * lotList[lotCountBase - 1];
        this._motivatingMin = this._max.value - SpeedLevel.UNIT;
        
        const randomizer = (this._motivatingMin - SpeedLevel.PLEASANT_MAX_MIN) * Math.random();
        this._pleasantMax = SpeedLevel.PLEASANT_MAX_MIN + randomizer;
        this._pleasantMin = this._pleasantMax - SpeedLevel.UNIT;
    }

    isPleasant(): boolean {
        return this._pleasantMin <= this._current.value && this._current.value <= this._pleasantMax;
    }

    isMotivating(): boolean {
        return this._motivatingMin <= this._current.value;
    }

    decreaseClock(): void {
        if (this._exhausted) {
            return;
        }
        this._current.value = Math.max(this._current.value - SpeedLevel.DECREASE_SPAN, SpeedLevel.MIN);
        this.health.removeSpanModifier(SpeedLevel.MODIFIER_KEY);
        this.health.addSpanModifier(SpeedLevel.MODIFIER_KEY, this.calcHealthModifier());
        this.health.removeCrawlSpanModifier(SpeedLevel.MODIFIER_KEY);
        this.health.addCrawlSpanModifier(SpeedLevel.MODIFIER_KEY ,this.calcHealthCrawlSpan());
        this.emit('change', this._current.value);
    }

    increaseByCrawl(): void {
        if (this._exhausted) {
            return;
        }
        this._current.value = Math.min(this._current.value + SpeedLevel.INCREASE_SPAN, this._max.value);
        this.health.addSpanModifier(SpeedLevel.MODIFIER_KEY, this.calcHealthModifier());
        this.health.removeCrawlSpanModifier(SpeedLevel.MODIFIER_KEY);
        this.health.addCrawlSpanModifier(SpeedLevel.MODIFIER_KEY ,this.calcHealthCrawlSpan());
        this.emit('change', this._current.value);
    }

    private calcHealthModifier(): number {
        return (this._current.value - SpeedLevel.MIN) * 5;
    }

    private calcHealthCrawlSpan(): number {
        return SpeedLevel.MAX_MAX / this.current.value;
    }   

    fixByExhausted(modifier: number): void {
        const amplifier = (SpeedLevel.MIN - SpeedLevel.EXHAUSTED_BASE) * modifier;
        this._current.value = SpeedLevel.EXHAUSTED_BASE + amplifier;
        this._exhausted = true;
        this.emit('change', this._current.value);
    }
}