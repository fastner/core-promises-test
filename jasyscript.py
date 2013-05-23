

from jasy.core.Util import executeCommand
import jasy

session.setField("runtime", "native")
session.setField("engine", "webkit")

@task
def clean():
	"""Clear build cache"""
	
	session.clean()
	Repository.clean()


@task
def distclean():
	"""Clear caches and build results"""
	
	session.clean()
	Repository.distclean()


def getPackageList():
	"""Resolv npm dependencies"""
	
	return ["promises-aplus-tests"]
	
	
def npmDependencies():
	"""Resolv npm dependencies"""
	
	node.npmInstall(getPackageList())


@task
def source():
	"""Generate source (development) version"""
	
	#npmDependencies()
	node.generateLoader("source/app.js")
	
	# Initialize shared objects
	assetManager = AssetManager(session).addSourceProfile()
	outputManager = OutputManager(session, assetManager, compressionLevel=0, formattingLevel=2)
	fileManager = FileManager(session)
	
	# Store loader script
	outputManager.storeKernel("{{prefix}}/script/kernel.js", bootCode="corepromisestest.Kernel.init()")
	
	# Process every possible permutation
	for permutation in session.permutate():
		
		# Resolving dependencies
		classes = Resolver(session).addClassName("%s.Main" % config.get("name")).getSortedClasses()
		
		# Writing source loader
		outputManager.storeLoader(classes, "{{prefix}}/script/%s-{{id}}.js" % config.get("name"), "new %s.Main;" % config.get("name"))
		
	
		
		
@task
def build():
	"""Generate source (development) version"""

	npmDependencies()

	# Initialize shared objects
	assetManager = AssetManager(session).addBuildProfile()
	outputManager = OutputManager(session, assetManager, compressionLevel=0, formattingLevel=2)
	fileManager = FileManager(session)
	
	# Store loader script
	outputManager.storeKernel("{{prefix}}/script/kernel.js", bootCode="corepromisestest.Kernel.init()")
	
	# Process every possible permutation
	for permutation in session.permutate():
		# Resolving dependencies
		classes = Resolver(session).addClassName("%s.Main" % config.get("name")).getSortedClasses()
		
		# Writing source loader
		outputManager.storeCompressed(classes, "{{prefix}}/script/%s-{{id}}.js" % config.get("name"), "new %s.Main;" % config.get("name"))
		
	node.generateLoader("build/app.js")
	node.generatePackageJson(getPackageList(), "build/package.json")
