# ChemJS

DockJS is the underlying code for the next revision of the Social Docking project.

DockJS is currently a work in progress and development will commence after the ChemJS project has been finished.

## Features
- GPU computing via WebCL
- Works in embedded HTML, HTML5 Web Workers, NodeJS

## Usage

Step 1: Download the source library (full or minified)
```bash
git clone git://github.com/ericjang/DockJS
```

Step 2: Include the source script in your html, your WebWorker, or NodeJS application.

Step 3: Set up simulation
```JavaScript
var docking_job = DockJS.newDock({
	'ligand':molecule,
	'target':molecule,
	'algorithm':{
		type:'MCMC',
		iterations:'10000',
		temperature:500K
	}
	'solvation':{
		boxSize:12
		solvent:'water'
		density:0.9
	},
	'flexibleLigand':false,
	'flexibleReceptor':{
		//flexible receptor parameters (e.g. cutoff goes here)
	},
	error:function({
		//error handling goes here
	});
});
```
Step 4: Run the experiment!
```JavaScript
docking_job.start();
```

## API

See the ChemJS framework on how chemicals are represented.