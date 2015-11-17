require-fest
------------

Плагин для подключения шаблонов fest через прокси.


```js
// Обязательный конфиг
require.config({
	map: {
		'*': {
			'fest': 'path/to/require-fest/require-fest.js'
		}
	},
	
	paths: {
		'fest-proxy': 'http://youdomain.org:3810'
	}
});

// Использование
define(['fest!blocks/form'], function (template) {
	var content = template({...});
});
```
