var nanobus = require('nanobus')
var inherits = require('inherits')

function Request (fn) {
    if ( !(this instanceof Request) ) return new Request(fn)
    this.fn = fn
    nanobus.call(this)
}
inherits(Request, nanobus)

Request.prototype.send = function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    var cb = args[args.length - 1]
    cb = typeof cb === 'function' ? cb : function noop () {}
    process.nextTick(function () {
        self.emit.apply(self, ['start'].concat(args))
    })
    this.fn.apply(null, args.concat(function (err, res) {
        if (err) {
            cb(err)
            return self.emit('error', err)
        }
        self.emit('resolve', res)
        cb(null, res)
    }))
    return this
}

module.exports = Request

