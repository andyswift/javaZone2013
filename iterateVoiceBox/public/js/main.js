(function ($, it) {

    var voiceBox = it.voiceBox({delay:600});
    var pianoSequence = it.pianoSequence({delay:200});
    var drumSequence = it.drumSequence({delay:200});

    // Send a hello message
    $('.btn-primary').on('click', function (e) {
        //var words = [12, 13, -1, 14, -1, -1, 11, -1, 24];
        var words = $(".speak").val().toLowerCase().split(" ");
        voiceBox.say(words);
    });

    $('.btn-success').on('click', function (e) {
        e.preventDefault()

        var notes = [70,71,72,80,83,-1,-1,90,90,1];

        pianoSequence.say(notes);
    });

    $('.navbar-brand').on('click', function (e) {
        var snares = [40,39,40,39,40,39,40,39,40];
        var kick = [36,-1,-1,-1,36,-1,-1,-1];
        drumSequence.say(snares);
        drumSequence.say(kick);
    });

})(jQuery, iterate);
