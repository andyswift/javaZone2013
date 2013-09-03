var express = require('express')
    , http = require('http')
    , talkBox = require('./lib/iterate-voice-box.js')
    , midi = require('./lib/iterate-midi.js')
    , dictionary = require('./lib/dictionary.js');

var app = express(),
    server = http.createServer(app),
    talkBox = talkBox.listen(server);

app.use(express.static(__dirname + '/public'));
app.get('/words', function(req, res) {
    res.json(dictionary.words);
});


server.listen(process.env.PORT || 3000)


midi.connect();

talkBox.player(midi.in,midi.out);

process.on("SIGTERM", function () {
    midi.close()
});