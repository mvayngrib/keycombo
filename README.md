# keycombo

tiny key combination detection library

## Usage

```js
var keycombo = require('keycombo')(window);
var keycode = require('keycode');
var combo = [keycode('Command'), keycode('R')]; // == [91, 82]

keycombo.on(combo, function() {
  console.log('you hit Command+R');
});
```
