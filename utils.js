
import { resolve } from 'path';

export function resolvePathWrap(path) {
    return function (name) {
        return resolve(path, name)
    }
}

export function fixFileNameSuffix(filename, suffix = 'js') {
    return `${filename}${filename.indexOf(`.${suffix}`) === -1 ? ('.' + suffix) : ''}`
}