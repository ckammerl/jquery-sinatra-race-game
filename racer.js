$(document).ready(function() {
  game = new Game();
  game.initalize();
});

var Game = function() {
  var board = new Board();
  var player1 = new Player();
  var player2 = new Player();

  var initalize = function() {
    board.create();
    board.setStartPos();

    // player1.name = prompt('Howdy Player1, what\'s your name?');
    // player2.name = prompt('Greetings Player2, what\'s your name?');

    // $('#player1 .active').text(player1.name);
    // $('#player2 .active').text(player2.name);

    $('body').on('keyup', function(event) {
      var pressedKey = event.keyCode || event.which;
      // bind player1 to letter A, player2 to letter L
      if ( pressedKey === 65 ) {
        var currentPos = $('#player1 .active');
        player1.move(currentPos);
      } else if ( pressedKey === 76 ) {
        var currentPos = $('#player2 .active');
        player2.move(currentPos);
      }
    })
  };

  return {
    initalize: initalize
  }
};

var Board = function() {
  var create = function() {
    var divLane = '<div class="lane"></div>';
    var divPosition = '<div class="position"></div>';

    $('#player1').append(divLane);
    $('#player2').append(divLane);

    for ( var i = 0; i <= 10; i++ ) {
      $('.lane').append(divPosition);
    }
  };

  var setStartPos = function() {
    var $startPos = $('.position:first-child');
    $startPos.addClass('active');
  };

  return {
    create: create,
    setStartPos: setStartPos
  }
};

var Player = function() {
  var move = function(currentPos) {
    var nextPos = $(currentPos).next();
    if ( nextPos.length !== 0 ) {
      $(currentPos).removeClass('active');
      nextPos.addClass('active');
    } else {
      // $(currentPos).closest('[id*=player]') => get the closest parent elem of $currentPos whose id includes the string 'player'
      var winner = $(currentPos).closest('[id*=player]').attr('id'); // => get id value, ie."player1" or "player2"
      $('#pop-up').text(winner + ' wins!!!').show();
    }
  };

  return {
    move: move
  }
};


