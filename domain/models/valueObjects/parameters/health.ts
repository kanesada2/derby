import { Modifiable } from '../modifiable';
import { Parameter } from '../parameter';

export class Health extends Parameter {
    static readonly MAX_BASE = 12000; // 200 * 60
    static readonly MAX_AMPLIFIER_MAX = 6000; // 100 * 60

    private crawlCost: Modifiable;

    constructor(enhancement: number|null = null) {
        super(Health.MAX_BASE, Health.MAX_BASE, 1);
        this.determineMax(enhancement);
        this.crawlCost = new Modifiable(1);
        this._current.value = this._max.value;
    }

    get isExhausted(): boolean {
        return this._current.value <= 0;
    }

    static calculateMaxWithEnhancement(enhancement: number): number {
        return Health.MAX_BASE * (1 + enhancement / 100);
    }

    private determineMax(enhancement: number|null): void {
        if(enhancement !== null) {
            this._max.value = Health.calculateMaxWithEnhancement(enhancement);
            return;
        }
        const lotCountBase = 10;
        const lotList: number[] = [];
        
        for (let i = 0; i < lotCountBase; i++) {
            lotList.push(Math.random());
        }
        
        lotList.sort((a, b) => b - a);
        // 乱数10個の最小値~乱数80個の10番目に大きい数
        this._max.value = Health.MAX_BASE + Health.MAX_AMPLIFIER_MAX * lotList[lotCountBase - 1];
    }

    decreaseByRun(): void {
        this._current.value = Math.max(this._current.value - this._span.value, 0);
        this.emit('change', this._current.value);
    }

    decreaseByCrawl(): void {
        this._current.value = Math.max(this._current.value - this.crawlCost.value, 0);
        this.emit('change', this._current.value);
    }

    addCrawlSpanModifier(key: string, value: number): void {
        this.crawlCost.addModifier({key, value});
    }

    removeCrawlSpanModifier(key: string): void {
        this.crawlCost.removeModifier(key);
    }
}