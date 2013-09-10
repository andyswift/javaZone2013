/*
 * midi library exports
 *
 * https://github.com/andrewswift/javaZone2013
 *
 * Copyright (c) 2013 Andrew Swift
 * Licensed under the MIT license.
 */
'use strict';
var midi = require('midi');

exports.out = new midi.output();
exports.in = new midi.input();
exports.ports = [exports.out,exports.in];

/**
 * Creates the midi port that is referenced
 * in Ableton Live for sending and receiving MIDI messages
 */
exports.connect = function () {
    console.log("Creating Iterate MIDI port");
    this.out.openVirtualPort('Iterate Music');
    this.in.openVirtualPort('Iterate Music');

    this.in.on('message', function (deltaTime, message) {
        console.log('Receiving <--:' + message + ' d:' + deltaTime);
    });
};

/**
 * Creates a function which can be used to send note on midi messages
 *
 * @param socket optional socket.io socket for broadcasting
 * @returns {Function}
 */
exports.keyDown = function (socket) {
    var _self = this;

    return function (data) {
        var message = [143 + data.channel, data.note, data.velocity];
        _self.out.sendMessage(message);
        socket && socket.broadcast.emit('playeddown', {'message': data});
    }

};

/**
 * Creates a function which can be used to send midi messages, that
 * is attached to a given socket.
 * @param socket
 * @returns {Function}
 */
exports.keyUp = function (socket) {
    var _self = this;

    return function (data) {
        var message = [127 + data.channel, data.note, data.velocity];
        _self.out.sendMessage(message);
        socket && socket.broadcast.emit('playedup', {'message': data});
    }
};

exports.close = function () {
    this.out.closePort();
    this.in.closePort();
};
