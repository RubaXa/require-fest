define(['jquery'], function ($) {
	'use strict';

	var isNodeJS = typeof window === 'undefined';
	var buildMap = {};
	var AMD_DEFINE = 'define';
	var defineDummy = function (name, deps, callback) {
		if (typeof name === 'function') {
			callback = name;
		}
		else if (typeof deps === 'function') {
			callback = deps;
		}

		return callback();
	};


	// Export
	return {
		write: function (pluginName, moduleName, write) {
			if (buildMap.hasOwnProperty(moduleName)) {
				var name = JSON.stringify(pluginName + "!" + moduleName);
                var content = JSON.stringify(buildMap[moduleName]);

                write(AMD_DEFINE + '(' + name + ', function () { return ' + content + '});\n');
            }
		},

		load: function (name, req, onLoad) {
			if (isNodeJS) {
				//var fs = requirejs.nodeRequire('fs');
				//var contents = fs.readFileSync(require.toUrl(name)) + '';
				//
				//buildMap[name] = contents;
				onLoad.error('todo');

				return;
			}

			var path = require.toUrl('fest-proxy/' + name).replace(/([^\^])\/+/g, '$1/').replace('./', '');

			$.ajax({url: path + '.js', dataType: 'text'}).then(function (source) {
				var template = Function('define', 'return ' + source)(defineDummy);
				onLoad(template);
			}).then($.noop, onLoad.error);
		}
	};
});
