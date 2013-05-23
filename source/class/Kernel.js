/*
 * Running Promises/A+ test suite against core promises implementation.
 *
 * Copyright (C) 2013 Sebastian Fastner
 */
core.Module("corepromisestest.Kernel", {
	init : function() {
		core.io.Script.load("script/corepromisestest-" + jasy.Env.getId() + ".js");
	}
});
