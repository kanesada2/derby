import EventEmitter from 'events';

export interface Timing {
    get emitters(): EventEmitter[];
}