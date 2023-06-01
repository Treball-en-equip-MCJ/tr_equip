class PlatformScene extends Phaser.Scene {
	constructor(){
		super('PlatformScene');
		this.platforms=null;
		this.player=null;
		this.cursors=null;
		this.doors=null;
		this.hidden=false;
		this.portes=null; //Ajuda per crear les portes tancades
		this.escales=null; //Escales repartides al mapa
		this.meta=null; //Porta final
	}
	
	preload(){
		this.load.image('background','../resources/escen2.png'); //Modificar amb un fons sense llocs per a les portes
		this.load.image('ground','../resources/ground.png');//Modificar amb el sprite del terra
		this.load.image('door','../resources/door.png');
		this.load.image('porta','../resources/door.png'); //Modificar amb el sprite de la porta tancada
		this.load.spritesheet('dude','../resources/girl.png',{frameWidth:64,frameHeight:48}); //Modificar amb el personatge
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
			this.doors=this.physics.add.staticGroup();
			this.doors.create(200,575,'door').setScale(0.9).refreshBody();
			this.portes=this.physics.add.staticGroup();
		}
		{
			this.player=this.physics.add.sprite(100,570,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			//FALTEN ANIMACIONS
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.physics.add.collider(this.doors,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
			this.physics.add.overlap(this.player,this.doors,(body1,body2)=>this.hidebehind(body1,body2));
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
		/*if(this.cursors.up.isDown && this.player.body.touching.down){
			this.player.setVelocityY(-400);
			//animació aqui
		}*/
	}
	hidebehind(player,door){
		if(this.cursors.up.isDown && this.player.body.touching.down){	
			if(!this.hidden){
				this.hidden=true;
				console.log("hidden");
				this.portes.create(door.x,door.y,'porta').setScale(0.9).refreshBody();
			}
		}
		else{
			if(this.hidden){
				this.hidden=false;
				console.log("Not hidden");
				this.portes.remove(this.portes.getLast(true), true);
			}
		}
	}
}