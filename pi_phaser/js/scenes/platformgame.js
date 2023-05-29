class PlatformScene extends Phaser.Scene {
	constructor(){
		super('PlatformScene');
		this.platforms=null;
		this.player=null;
		this.enemy=null;
		this.cursors=null;
		this.doors=null;
		this.hidden=false;
		this.velocitatEnemy=40;
		this.enemicDreta=true
	}
	
	preload(){
		this.load.image('background','../resources/escen2.png');
		this.load.image('ground','../resources/ground.png');
		this.load.image('door','../resources/door.png');
		this.load.image('porta','../resources/door.png');
		this.load.spritesheet('dude','../resources/dude.png',{frameWidth:32,frameHeight:48});
		this.load.spritesheet('enemy','../resources/enemy.png',{frameWidth:120,frameHeight:60});
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
			this.doors=this.physics.add.group({
				key: 'door',
				repeat: 6,
				setXY: {x:12,y:0,stepX:200}
			});
			this.doors.create(200,500,'door').setScale(0.9).refreshBody();
		}
		{
			this.player=this.physics.add.sprite(100,570,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			//FALTEN ANIMACIONS
		}
		{
			this.enemy=this.physics.add.sprite(360,570,'enemy');
			this.enemy.setBounce(0.2);
			this.enemy.setCollideWorldBounds(true);
			this.enemy.setVelocityX(this.velocitatEnemy);
			//FALTEN ANIMACIONS	
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.physics.add.collider(this.enemy,this.platforms);
			this.physics.add.collider(this.doors,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
			this.physics.add.overlap(this.player,this.doors,(body1,body2)=>this.hidebehind(body1,body2));
			this.physics.add.overlap(this.player,this.enemy,(body1,body2)=>this.collision(body1,body2));
		}
		
		setInterval(() => {
			if (this.velocitatEnemy > 0){
				this.velocitatEnemy = -40;
				this.enemicDreta = false;
			}
			else{
				this.velocitatEnemy = 40;
				this.enemicDreta = true;
			}
			this.enemy.setVelocityX(this.velocitatEnemy);
		}, 10000);
		
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
		var porta=null;
		if(this.cursors.up.isDown && this.player.body.touching.down){	
			if(!this.hidden){
				this.hidden=true;
				console.log("hidden");
				porta=this.add.image(200,500,'porta').setScale(0.9);
			}
		}
		else{
			if(this.hidden){
				this.hidden=false;
				console.log("Not hidden");
				porta=null;
			}
		}//INTENTAR TANCAR LA PORTA
		/*setTimeout(() => {
			if(this.hidden){
				this.hidden=false;
				console.log("not hidden");
				door.disableBody(true,true);
			}
		},5000);*/
	}

	collision(player,enemy){
		this.player.reset(100,560);
	}
}