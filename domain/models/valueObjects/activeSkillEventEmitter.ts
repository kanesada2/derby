import { EventEmitter } from 'events';
import { Chip, ElementType } from '../entities/chip';
import { Motivation } from './motivation';

const REQUIREMENTS_PER_TIER = 1000;

export class ActiveSkillEventEmitter extends EventEmitter {
    private _canInteract: boolean = false;
    private _activated: boolean = false;

    constructor(
        private _type: ElementType,
        private _tier: number,
        private _motivation: Motivation
    ){
        super();
        this._motivation.on('change', () => {
            if(!this.available){
                return;
            }
            if(this.requirements > this._motivation.current) {
                return;
            }
            this._canInteract = true;
            this.emit('change');
        });
    }

    get type(): ElementType {
        return this._type;
    }
    get tier(): number {
        return this._tier;
    }
    get available(): boolean {
        return this._tier > 0;
    }
    get canInteract(): boolean {
        return this._canInteract;
    }
    get activated(): boolean {
        return this._activated;
    }

    get requirements(): number {
        return this._tier * REQUIREMENTS_PER_TIER;
    }

    interact(): void {
        if(this._activated || !this._canInteract) {
            return;
        }
        this._activated = true;
        this.emit('change');
    }
}

export class ActiveSkillEventEmitterFactory {
    static createAll(motivation: Motivation, chips: Chip[]): ActiveSkillEventEmitter[] {
        let emitters: ActiveSkillEventEmitter[] = [];
        const chipsByElement =  Map.groupBy(chips, ({ element }) => element);
        chipsByElement.forEach((chips, element) => {
            const tier = chips.length / 2; // TODO:Elementごとに指定し直す
            emitters.push(new ActiveSkillEventEmitter(element, tier, motivation));
        });
        return emitters;
    }
}

// collection作ってfindByElementする処理いりそう、その場合Factoryは必要ないかも