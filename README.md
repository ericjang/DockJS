# DockJS

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

Step 2: Include the source script in your html, your WebWorker, or NodeJS application. Make sure that GraphJS and ChemJS (dependencies) are imported beforehand.

```html
<script src="GraphJS.js"></script>
<script src="ChemJS.js"></script>
<script src="DockJS.js"></script>
```

Step 3: Set up simulation
```JavaScript

var docking_job = new DockJS.simulation({
	'ligandOptions': { molecule : caffeine },
	'targetOptions': { molecule: adenosineReceptor },
});

```
Step 4: Run the simulation!
```JavaScript

var result = docking_job.start(); //returns a 'result' object

/**
result;

{
	'status':'completed',//'aborted'
	'optimal ligand pose': {
		ligand : Molecule Obj,//ligand molecule with optimal atom positions
		receptor : Molecule Obj//receptor molecule with optimal atom positions
	}
	'score':-1000,//in kJ/mol
	'simulationTime': Time difference
}
*/

```

## API

DockJS is designed in a modular fashion, enabling scientists to implement their own algorithms & extend DockJS with minimal effort. 

### Simulations and Experiments

In DockJS, a 'simulation' is the simulated interaction between ONE ligand and ONE receptor. An 'experiment' consists of multiple simulations.

See the ChemJS framework on how chemicals are represented.