var Bus = require('nanobus')

function Request (key, fn) {
    var bus = Bus()

    function request (data) {
        process.nextTick(function () {
            bus.emit('start', { op: key, args: data })
        })

        fn(data, function onResponse (err, res) {
            bus.emit('resolve', { op: key, args: data })
            if (err) return bus.emit('error', err)
            bus.emit(key, res)
            bus.removeAllListeners()
        })
        return request
    }

    request.applyTo = function (obj) {
        bus.on('*', function (evName, data) {
            if (typeof obj[evName] !== 'function') return
            obj[evName].call(obj, data)
        })
        return request
    }

    request.on = function (name, fn) {
        bus.on(name, fn)
        return request
    }

    return request
}

module.exports = Request

