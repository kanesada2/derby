import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export interface Timing {
    get emitters(): EventEmitter[];
}