import { EventEmitter } from 'events';

export interface Condition {
    get emitters(): EventEmitter[];
    get active(): boolean;
}