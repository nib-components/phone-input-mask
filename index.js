var MaskedInput = require('masked-input');

var DIGIT = /^\d$/;

/**
 * Get whether a character is accepted
 * @param   {string} char
 * @returns {boolean}
 */
function accept(char) {
  return DIGIT.test(char);
}

/**
 * Format
 * @param event
 */
function changed(event) {
  var
    value = event.value,
    start = event.selectionStart,
    end   = event.selectionEnd
  ;

  //filter non-digit characters so we don't need to know where the digit was inserted
  function filter() {
    for (var i=0; i<value.length; ++i) {
      if (!DIGIT.test(value[i])) {
        value = value.substr(0, i)+value.substr(i+1);
        if (start > i) {
          --start;
        }
        if (end > i) {
          --end;
        }
        --i;
      }
    }
  }

  if (value.substr(0, 2) === '04') {

    //backspace the space immediately to the left of the number
    if (event.name === 'BACKSPACE') {
      if (start === end && (start === 4 || start === 8)) {
        value = value.substr(0, start-1)+value.substr(start);
        --start;
        --end;
      }
    }

    filter();

    //add the first space
    if ((event.name !== 'BACKSPACE' && value.length >= 4) || (event.name === 'BACKSPACE' && value.length > 4)) {
      value = value.substr(0, 4)+' '+value.substr(4);
      if (start >= 4) ++start;
      if (end >= 4) ++end;
    }

    //add the second space
    if ((event.name !== 'BACKSPACE' && value.length >= 8) || (event.name === 'BACKSPACE' && value.length > 8)) {
      value = value.substr(0, 8)+' '+value.substr(8);
      if (start >= 8) ++start;
      if (end >= 8) ++end;
    }

  } else {

    //backspace the space immediately to the left of the number
    if (event.name === 'BACKSPACE') {
      if (start === end && (start === 2 || start === 7)) {
        value = value.substr(0, start-1)+value.substr(start);
        --start;
        --end;
      }
    }

    filter();

    //add the first space
    if ((event.name !== 'BACKSPACE' && value.length >= 2) || (event.name === 'BACKSPACE' && value.length > 2)) {
      value = value.substr(0, 2)+' '+value.substr(2);
      if (start >= 2) ++start;
      if (end >= 2) ++end;
    }

    //add the second space
    if ((event.name !== 'BACKSPACE' && value.length >= 7) || (event.name === 'BACKSPACE' && value.length > 7)) {
      value = value.substr(0, 7)+' '+value.substr(7);
      if (start >= 7) ++start;
      if (end >= 7) ++end;
    }

  }

  //set the value and position
  event.value           = value.substr(0, 12);
  event.selectionStart  = start;
  event.selectionEnd    = end;

}

module.exports = function(el) {
  return new MaskedInput({
    el:       el,
    accept:   accept,
    changed:  changed
  });
};

module.exports.accept = accept;
module.exports.changed = changed;