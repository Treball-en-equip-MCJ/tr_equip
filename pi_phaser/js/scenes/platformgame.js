class PlatformScene extends Phaser.Scene {
	constructor(){
		super('PlatformScene');
		this.platforms=null;
		this.player=null;
		this.cursors=null;
	}
	
	preload(){
		this.load.image('background','../resources/escen2.png');
		this.load.image('ground','../resources/ground.png');
		this.load.spritesheet('dude','../resources/dude.png',{frameWidth:32,frameHeight:48});
	}

	create(){
		this.add.image(600,350,'background');
		{
			this.platforms = this.physics.add.staticGroup();
			this.platforms.create(600,0,'ground').setScale(4.1).refreshBody();
			this.platforms.create(600,700,'ground').setScale(3.2).refreshBody();
			this.platforms.create(-350,258,'ground').setScale(1.6).refreshBody();
			this.platforms.create(600,258,'ground').setScale(1.6).refreshBody();
			this.platforms.create(800,258,'ground').setScale(1.6).refreshBody();
			this.platforms.create(0,461,'ground').setScale(1.6).refreshBody();
			this.platforms.create(580,461,'ground').setScale(1.6).refreshBody();
			this.platforms.create(1550,461,'ground').setScale(1.6).refreshBody();
		}
		{
			this.player=this.physics.add.sprite(100,570,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			//FALTEN ANIMACIONS
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
		}
		
	}

	update(){
		if(this.cursors.left.isDown){
			this.player.setVelocityX(-160);
			//animació aqui
		}
		else if(this.cursors.right.isDown){
			this.player.setVelocityX(160);
			//animació aqui
		}
		else {
			this.player.setVelocityX(0);
			//animació aqui
		}
		if(this.cursors.up.isDown && this.player.body.touching.down){
			this.player.setVelocityY(-400);
			//animació aqui
		}
	}
}