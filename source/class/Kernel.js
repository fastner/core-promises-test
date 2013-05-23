core.Module("corepromisestest.Kernel", {
	init : function() {
		core.io.Script.load("script/corepromisestest-" + jasy.Env.getId() + ".js");
	}
});
