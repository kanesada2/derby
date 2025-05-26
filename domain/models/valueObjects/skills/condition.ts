import { EventEmitter } from 'react-native/Libraries/vendor/emitter/EventEmitter';

export interface Condition {
    get emitters(): EventEmitter[];
    get active(): boolean;
}