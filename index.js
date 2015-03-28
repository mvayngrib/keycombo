function comboEquals(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (var p in a) {
    if (!(p in b)) return false;
  }

  return true;
}

function toObject(arr) {
  if (!Array.isArray(arr)) return arr;

  var map = {};
  for (var i = 0; i < arr.length; i++) {
    map[arr[i]] = true;
  }

  return map;
}

module.exports = function(el) {
  var keys = {};
  var registry = [];

  function reset() {
    keys = {};
  }

  /**
   * @param combo - array of key codes
   */
  function onCombo(combo, handler) {
    combo = toObject(combo);
    registry.push({
      combo: combo,
      handler: handler
    });
  }

  function stopListening(combo, handler) {
    combo = toObject(combo);
    registry = registry.filter(function(info, idx) {
      if (!comboEquals(combo, info.combo)) return true;
      if (handler && info.handler !== handler) return true;
    });
  }

  function testCombos() {
    registry.forEach(function(info) {
      for (var key in info.combo) {
        if (!keys[key]) return;
      }

      info.handler();
    });
  }

  el.addEventListener('blur', reset);

  el.addEventListener('keyup',function(e){
    delete keys[e.keyCode];
  });

  el.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
    testCombos();
  });

  return {
    on: onCombo,
    off: stopListening
  };
}
