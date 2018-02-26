export function removePrefix(string, prefix) {
    string = _.trim(string)
    return string.startsWith(prefix) ? string.slice(prefix.length) : string
}
export function removeSuffix(string, suffix) {
    string = _.trim(string)
    return string.endsWith(suffix) ? string.slice(0, suffix.length) : string
}

export function prepareDeviceStyles(deviceStyles, currentDevice) {
    var deviceStylesMap = _.cloneDeep(deviceStyles);
    var deviceStylesMapKeys = _.keys(deviceStylesMap)
    _.forEach(deviceStylesMapKeys, function (objectKey) {
        if (_.includes(objectKey,',')){
            var objectKeys = objectKey.split(',')
            _.forEach(objectKeys, function (objectKeyToInclude) {
                deviceStylesMap[objectKeyToInclude] =   deviceStylesMap[objectKey]
            })
        }
    })
    deviceStylesMap[currentDevice.version + '_portrait'] = _.extend({}, /* add styling for both orientations to avoid race condition with setting data in this.deviceStylesMap when orientation is changing,
         error: undefined is not an object (evaluating 'this.deviceStylesMap[this.props.appReducer.currentDevice.title].priceButton*/
        (deviceStylesMap['default'] ? deviceStylesMap['default'] : {}),
        (deviceStylesMap['default_portrait'] ? deviceStylesMap['default_portrait'] : {}),
        (deviceStylesMap[currentDevice.version] ? deviceStylesMap[currentDevice.version] : {}),
        (deviceStylesMap[currentDevice.version + '_portrait'] ? deviceStylesMap[currentDevice.version + '_portrait'] : {}));
    deviceStylesMap[currentDevice.version + '_landscape'] = _.extend({},
        (deviceStylesMap['default'] ? deviceStylesMap['default'] : {}),
        (deviceStylesMap['default_landscape'] ? deviceStylesMap['default_landscape'] : {}),
        (deviceStylesMap[currentDevice.version] ? deviceStylesMap[currentDevice.version] : {}),
        (deviceStylesMap[currentDevice.version + '_landscape'] ? deviceStylesMap[currentDevice.version + '_landscape'] : {}));

    return deviceStylesMap
}
