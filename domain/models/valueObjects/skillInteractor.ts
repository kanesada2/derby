import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { ElementType } from '../entities/chip';
import { Motivation } from './parameters/motivation';

const REQUIREMENTS_PER_TIER = 3000;

export class SkillInteractor extends EventEmitter {
    static readonly EVENT_INTERACT = 'interact';
    static readonly EVENT_INTERACT_AVAILABLE = 'interactAvailable';

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
            this._canInteract = !this._interacted && this.requirements <= this._motivation.current.value;
            this.emit(SkillInteractor.EVENT_INTERACT_AVAILABLE);
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