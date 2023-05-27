
var config={
	type:Phaser.AUTO,
	width:1200,
	heigh:700,
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