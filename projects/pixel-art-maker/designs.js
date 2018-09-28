function makeGrid() {
  let height = $('#input_height').val();
  let width = $('#input_width').val();
  let table = $('#pixel_canvas');
  table.empty();
  for (let i = 0; i < height; i++) {
    let row = $('<tr></tr>');
    for (let j = 0; j < width; j++) {
      row.append('<td></td>');
    }
    table.append(row);
  }
  return table;
}

/*** Making table for history of used colors (html remains clear) ***/
function makeHistory() {
  let history = {};
  history.table = $('#history');
  history.colors = [];
  let row = $('<tr></tr>');
  for (let i = 0; i < 10; i++) {
    row.append('<td></td>');
  }
  history.table.append(row);
  return history;
}

function updateHistory(history, color) {
  history.colors.push(color);
  if (history.colors.length > 10) {
    history.colors.shift();
  }
  history.colors.forEach(function(item, i) {
    let elem = $('#history td:nth-of-type(' + (i+1) + ')');
    elem.css('background-color', item);

    /*** Saving color  in additional attribute to avoid cumbersome transformations
         from rgb to hex when applying previous colors to color-picker ***/
    elem.attr('data-color', item);
  })
}

$(function() {
  let grid = makeGrid();
  let history = makeHistory();

  let picker = $('#colorPicker');
  let color = picker.val();

  /*** A little bit improved event listeners, to fill in large areas on grid
       holding the mouse button ***/
  grid.on('mousedown', 'td', function() {
    $(this).css('background', color);
    grid.on('mouseover', 'td', function() {
      $(this).css('background', color);
    })
    $(document).mouseup(function() {
      grid.off('mouseover');
      $(document).off('mouseup');
    })
  })

  picker.change(function() {
    color = picker.val();
    updateHistory(history, color);
  })

  history.table.on('click', 'td', function() {
    color = $(this).attr('data-color');
    picker.val(color);
  })

  $('#sizePicker').submit(function(event) {
    makeGrid();
    event.preventDefault();
  });

})
