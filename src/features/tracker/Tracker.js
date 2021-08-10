import { DAY_TRACKER, NIGHT_TRACKER, HUMIDITY_TRACKER } from '../../utils/constants';
import { isDayTime, isNightTime } from '../../utils/timeUtil';

export function Tracker(type = '') {
    this.values = [];
    this.type = type;

    this.setValue = (value) => {
        this.values.push(value);
    }

    this.getMin = () => {
        if (this.values.length === 0) {
            return null;
        }

        return this.values.reduce((acc, el) => acc = acc > el ? el : acc);
    }

    this.getMax = () => {
        if (this.values.length === 0) {
            return null;
        }

        return this.values.reduce((acc, el) => acc = el > acc ? el : acc);
    }

    this.getMean = () => {
        if (this.values.length === 0) {
            return null;
        }

        return Math.floor(this.values.reduce((acc, el) => (acc + el)) / this.values.length);
    }

    /*
        First reducer counts occurance of values and constructs a new map that holds the occurances
        Second reducer compares the number of occurances and returns the value with the highest occurance rate
    */
    this.getMode = () => {
        if (this.values.length === 0) {
            return null;
        }

        return Math.floor(Object.values(this.values.reduce((acc, el) => {
            if (!(el in acc)) {
                acc[el] = [0, el];
            }

            acc[el][0]++;
            return acc;
        }, {})).reduce((acc, el) => el[0] < acc[0] ? acc : el, [0, null])[1]);
    }
}

export const buildTracker = (type) => {
    if (!type) {
        return;
    }
    const tracker = new Tracker(type);

    return tracker;
}

export const updateTracker = (tracker, data) => {
    if (!tracker || !data) {
        return;
    }

    switch (tracker.type) {
        case DAY_TRACKER:
            data.filter(el => isDayTime(el.dt)).forEach(el => tracker.setValue(el.temp));
            break;
        case NIGHT_TRACKER:
            data.filter(el => isNightTime(el.dt)).forEach(el => tracker.setValue(el.temp));
            break;
        case HUMIDITY_TRACKER:
            data.forEach(el => tracker.setValue(el.humidity));
            break;
        default:
            break;
    }

    return tracker;
}
