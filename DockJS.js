/**
 * @namespace Holds all DockJS components together.
 */
var DockJS = (function() {
	if (!GraphJS || !ChemJS) {
		console.log("GraphJS or ChemJS seems to be missing. cannot proceed!");
		break;
	}
	
	var container = {};
	container.classes = {};
	container.scoringFunctions = {};
	
	var VERSION = '0.0.1';
	
	container.getVersion = function(){
		return VERSION;
	};
	
	container.runDemo = function() {
		//run a sample docking Experiment with default parameters
		//also print each step out!
		
		/*
		
		
		*/
		
	};
	
	return container;
	
})();

//Simulation class - contains a single docking run
(function(d,classes) {
	/*
	var docking_job = new DockJS.Simulation({
		'ligandOptions': {
			molecule : caffeine //instance of 'Molecule' from ChemJS
		},
		'targetOptions': {
			molecule: adenosineReceptor
		}
		'scoringFunction':algorithm Obj,//this is a class within DockJS
		'solvationOptions':{
			boxSize:12
			solvent:'water'
			density:0.9
		},
		'desiredOutputs':'optimal ligand pose', 'best score'
		'error':function({
			console.log('Error! Something went wrong - aborting Experiment!');
		});
	});
	*/
	
	/**
	 * Creates an instance of Simulation
	 * 
	 * @constructor
	 * @this {Simulation}
	 * @param params Parameters for the Simulation
	 * @param params.ligandOptions
	 * @param params.ligandOptions.molecule {ChemJS.classes.molecule} ChemJS ligand molecule
	 * @param params.ligandOptions.flexible {Boolean} Whether to treat the molecule as flexible or not
	 *
	 * @param params.targeOptions Receptor options
	 * @param params.targetOptions.molecule {ChemJS.classes.molecule} ChemJS receptor molecule
	 * @param params.targetOptions.flexible {Boolean} Treat receptor as flexible
	 *
	 * @param params.scoringFunction {classes.scoringFunction} 
	 * @param params.solvationOptions 
	 * @param params.desiredOutputs 
	 */
	classes.Simulation = function(params){
		this.ligandOptions = params.ligandOptions,
		this.targetOptions = params.targetOptions,
		this.scoringFunction = params.scoringFunction,
		this.solvationOptions = params.solvationOptions,
		this.desiredOutputs = params.desiredOutputs,
		this.error = params.error
		return True;
	};
	
	/** 
	 * start the Simulation
	 * 
	 * @this {Simulation}
	 * @return {SimulationResult}
	 */
	function start() {
		this.startTime = new Date();
		
		//stuff parameters into the scoring function provided
		
		//when finished, instantiates a SimulationResult and returns it based on parameters
		
		this.endTime = new Date();
	}
	
	
	classes.Simulation.prototype = {
		'start' : start,
	}
	
	
})(DockJS, DockJS.classes);//anything from ChemJS that needs to be imported into the closure as well?


//SimulationResult class - instantiated when Simulation finishes
//you shouldn't instantiate this by itself <- not available to API!

/*
{
	'status':'completed',//'aborted'
	'optimal ligand pose': {
		ligand : Molecule Obj,//ligand molecule with optimal atom positions
		receptor : Molecule Obj//receptor molecule with optimal atom positions
	}
	'score':-1000,//in kJ/mol
	'SimulationTime': Time difference
}
*/

(function(classes){
	
	classes.SimulationResult = function(params){
		this.status = params.status;
		this.optimalPose = params.optimalPose;
		this.score = params.score;
		this.startTime = params.startTime;
		this.endTime = params.endTime;
		return True;
	};
	
})(DockJS.classes);


//Experiment class - contains a series of Simulations
(function(classes){
	
	classes.Experiment = function(params){	
		this.progress = 0;//percentage of Experiment run
		this.postProcess = params.postProcess;
		this.description = params.description;//string description for Experiment
		this.Simulations = [];//all the Simulations are stored here
		return True;
	};
	
	function addSimulation(Simulation) {
		var i = this.Simulations.indexOf(Simulation);
		if (i !== -1) {
			this.Simulations.push(Simulation);
		} else {
			//update the Simulation
			this.Simulations[i] = Simulation;
		}
	};
	
	/** 
	 * start the Experiment
	 * 
	 * @this {Experiment}
	 * @return {ExperimentResult}
	 */
	function start() {
		var resultsArray = [],
			numSuccess = 0,
			percentSuccess = 0;
		
		for (var i = 0, ii = this.Simulations.length; i < ii ; i++) {
			resultsArray[i] = this.Simulations[i].start();
			if (resultsArray[i].status === 'success') {
				numSuccess += 1;
			}
			this.progress = (resultsArray.length / this.Simulations.length);
		}
		percentSuccess = (numSuccess / this.Simulations.length);
		
		var result = new classes.ExperimentResult({
			'percentSuccess' : percentSuccess
			'postProcess' : this.postProcess
			'resultsArray' : resultsArray
		});
		return result;
	}
	
	classes.Experiment.prototype = {
		'addSimulation' : addSimulation,
		'start' : start
	}
	
})(DockJS.classes,GraphJS.utils);


//ExperimentResult class - instantiated when Experiment finishes.
(function(classes){
	classes.ExperimentResult = function(params){
		this.percentSuccess = params.percentSuccess;
		this.results = params.resultsArray;
		this.postProcess = params.postProcess;
		return True;
	};
})(DockJS.classes);

/**
 *
 * scoringFunction Class
 *
 */

(function(classes){
	classes.scoringFunction(params,input) {
		
		return True;
	}
})(DockJS.classes);

/**
 *
 * DEFAULT : Lamarkian Genetic Algorithm
 *
 */

(function(d,classes,sf){
	sf.LamarkianGA = new classes.scoringFunction({
		//parameters go here
	})
})(DockJS,DockJS.classes,DockJS.scoringFunctions);

