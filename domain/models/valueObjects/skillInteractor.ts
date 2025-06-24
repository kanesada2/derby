import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { ElementType } from '../entities/chip';
import { Motivation } from './parameters/motivation';

const REQUIREMENTS_PER_TIER = 3000;

export class SkillInteractor extends EventEmitter {
    private _canInteract: boolean = false;
    private _interacted: boolean = false;

    constructor(
        private _type: ElementType,
        private _tier: number,
        private _motivation: Motivation
    ){
        super();
        this._motivation.addListener('change', () => {
            if(!this.available){
                return;
            }
            if(this.requirements > this._motivation.current.value) {
                return;
            }
            this._canInteract = true;
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
    get interacted(): boolean {
        return this._interacted;
    }

    get requirements(): number {
        return this._tier * REQUIREMENTS_PER_TIER;
    }

    interact(): void {
        if(this._interacted || !this._canInteract) {
            return;
        }
        this._interacted = true;
        this.emit('change');
    }
}