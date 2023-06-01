
var config={
	type:Phaser.AUTO,
	width:1685,
	heigh:900,
	parent:'game_area',
	physics: {
		default:'arcade',
		arcade:{
			gravity: {y: 300},
			debug: false
		}
	},
	scene: [PlatformScene]
};
var game= new Phaser.Game(config);