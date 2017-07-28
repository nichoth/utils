var assert = require('assert')
var Request = require('../request')

var req = Request(asyncCall)
    .on('start', function (args) {
        assert.deepEqual(args, { example: 'data' })
        console.log('start', args)
    })
    .on('error', function (err) {
        console.log('error')
        throw err
    })
    .on('resolve', function (res) {
        assert.deepEqual(res, { example: 'data' })
        console.log('resolve', res)
    })

req.send({ example: 'data' })

function asyncCall (data, cb) {
    process.nextTick(function () {
        // echo
        cb(null, data)
    })
}

