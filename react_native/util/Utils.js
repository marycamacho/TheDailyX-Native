export function removePrefix(string, prefix) {
    string = _.trim(string)
    return string.startsWith(prefix) ? string.slice(prefix.length) : string
}
export function removeSuffix(string, suffix) {
    string = _.trim(string)
    return string.endsWith(suffix) ? string.slice(0, suffix.length) : string
}

