$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');
  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    for (let row = 0; row < 10; row++) {
      const tr = $('<tr>');
      for (let column = 0; column < 10; column++) {
        $('td[data-r="' + row + '"][data-c="' + column + '"]').removeClass('ship').addClass('water');
      }
    }
    const ships = [5, 4, 3, 3, 2];
    // Here you have to add your code for building a random battleground.
    for (let i = 0; i < ships.length; i++) { //run through all ships
      var done = false;
      while (!done) { //as long as a ship is not drawn, try to draw it
        var x = randomValue(9, 0);
        var y = randomValue(9, 0);
        done = buildShip(x, y, ships[i]);
      }
    }
  });
});

function randomValue(upper, lower) {
  return Math.floor((Math.random() * upper) + lower);
}
function buildShip(x, y, ship) {    //tries to build a ship
  if (x + ship - 1 < 10 && checkSurroundings(x, y, ship + 1, -1, 0)) {  //create ship horizontal from left to right
    for (let j = 0; j < ship; j++) {
      $('td[data-r="' + y + '"][data-c="' + (x + j) + '"]').removeClass('water').addClass('ship');
    }
  } else if (x - ship - 1 >= 0 && checkSurroundings(x, y, 2, -ship - 1, 0)) {  //create ship horizontal from right to left
    for (let j = 0; j < ship; j++) {
      $('td[data-r="' + y + '"][data-c="' + (x - j) + '"]').removeClass('water').addClass('ship');
    }
  } else if (y + ship - 1 < 10 && checkSurroundings(x, y, ship + 1, -1, 1)) { //create ship vertical from top to bottom
    for (let j = 0; j < ship; j++) {
      $('td[data-r="' + (y + j) + '"][data-c="' + x + '"]').removeClass('water').addClass('ship');
    }
  } else if (y - ship - 1 >= 0 && checkSurroundings(x, y, 2, -ship - 1, 1)) {  //create ship vertical from bottom to top
    for (let j = 0; j < ship; j++) {
      $('td[data-r="' + (y - j) + '"][data-c="' + x + '"]').removeClass('water').addClass('ship');
    }
  } else {  //ship cannot be placed starting from this point
    return false;
  }
  return true;
}

function checkSurroundings(x, y, ship, j, direction) {  //checks if another ship is in the surrounding of a given ship, before it is created
  switch (direction) {
    case 0: //build ship horizontal
      for (let k = j; k < ship; k++) {
        if ($('td[data-r="' + y + '"][data-c="' + (x + k) + '"]').hasClass('ship')) { //check horizontal possibilities of a ship
          return false;
        } else {
          if ($('td[data-r="' + (y + 1) + '"][data-c="' + (x + k) + '"]').hasClass('ship')) { //check if a ship is over this ship
            return false;
          } else {
            if ($('td[data-r="' + (y - 1) + '"][data-c="' + (x + k) + '"]').hasClass('ship')) {  //check if a ship is under this ship
              return false;
            }
          }
        }
      }
      break;
    case 1: //build ship vertical
      for (let k = j; k < ship; k++) {
        if ($('td[data-r="' + (y + k) + '"][data-c="' + x + '"]').hasClass('ship')) { //check vertical possibilities of a ship
          return false;
        } else {
          if ($('td[data-r="' + (y + k) + '"][data-c="' + (x + 1) + '"]').hasClass('ship')) { //check if a ship is right to this ship
            return false;
          } else {
            if ($('td[data-r="' + (y + k) + '"][data-c="' + (x - 1) + '"]').hasClass('ship')) { //check if a ship is left to this ship
              return false;
            }
          }
        }
      }
  }
  return true;  //the surroundings are ok
}