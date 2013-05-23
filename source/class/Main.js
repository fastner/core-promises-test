/*
 * Running Promises/A+ test suite against core promises implementation.
 *
 * Copyright (C) 2013 Sebastian Fastner
 */
core.Class("corepromisestest.Main", {
	construct : function() {
		var adapter = {
			pending : function() {
				var promise = core.event.Promise.obtain();
				return {
					promise: promise,
					fulfill: promise.fulfill.bind(promise),
					reject: promise.reject.bind(promise)
				};
			}
		};

		var pt = require("promises-aplus-tests");
		pt(adapter, function(err) {
			console.log((err ? err : 0) + " errors");
			console.log("Pool size of promises pool " + core.event.Promise.getPoolSize());
		});
	}
});
