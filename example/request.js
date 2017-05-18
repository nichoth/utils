var Request = require('../request')

function asyncCall (data, cb) {
    process.nextTick(function () {
        // echo
        cb(null, data)
    })
}

myModel = {
    foo: console.log.bind(console, 'foo'),
    request: {
        start: console.log.bind(console, 'start'),
        resolve: console.log.bind(console, 'resolve')
    }
}

var req = Request('foo', asyncCall)

req({ myArgs: 'test' })
    .applyTo(myModel)
    .applyTo(myModel.request)
    .on('start', console.log.bind(console, 'request started'))

