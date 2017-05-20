var Request = require('../request')

function asyncCall (data, cb) {
    process.nextTick(function () {
        // echo
        cb(null, data)
    })
}

var req = Request('foo', asyncCall)

// Emit these events -- 'start', the key you passed in (or 'error'),
// and 'resolve'
// Also there is '*', which calls the subscriber with the event name
// and the response
// After the function calls back, all the listeners are removed
req({ myArgs: 'test' })
    .on('start', console.log.bind(console, 'start'))
    .on('foo', console.log.bind(console, 'foo'))
    .on('resolve', console.log.bind(console, 'resolve'))
    .on('error', console.log.bind(console, 'error'))
    .on('*', console.log.bind(console, 'log all events'))


// if `myModel` has a key equal to the event name, call it
var myModel = MyModel()
Request('foo', asyncCall)({ myArgs: 'test' })
    .applyTo(myModel)
    .applyTo(myModel.request)

function MyModel () {
    return {
        foo: console.log.bind(console, 'foo'),
        request: {
            start: console.log.bind(console, 'start'),
            resolve: console.log.bind(console, 'resolve')
        }
    }
}
