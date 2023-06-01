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
		this.velocitatEnemy=40;
		this.enemicDreta=true
		this.enemy=null;
		this.nVides=3;
		this.spawnx=100;
		this.spawny=570;
	}
	
	preload(){
		this.load.image('background','../resources/fondo grande.png'); //Modificar amb un fons sense llocs per a les portes
		this.load.image('ground','../resources/ground.png');//Modificar amb el sprite del terra
		this.load.image('ground2','../resources/ground2.png');
		this.load.image('ground3','../resources/ground3.png');
		this.load.image('door','../resources/door.png');
		this.load.image('porta','../resources/porta1.png'); 
		this.load.image('porta2','../resources/porta2.png'); 
		this.load.spritesheet('dude','../resources/dude.png',{frameWidth:32,frameHeight:48}); //Modificar amb el personatge
		this.load.spritesheet('enemy','../resources/enemy.png',{frameWidth:120,frameHeight:60});
	}

	create(){
		this.add.image(600,350,'background').setScale(0.6);
		{
			this.platforms = this.physics.add.staticGroup();
			this.platforms.create(600,40,'ground').setScale(1.5).refreshBody();
			this.platforms.create(600,740,'ground').setScale(1.5).refreshBody();
			this.platforms.create(600,662,'ground3').setScale(1.5).refreshBody();
			this.platforms.create(100,662,'ground3').setScale(1.5).refreshBody();
			this.platforms.create(1000,662,'ground3').setScale(1.5).refreshBody();
			this.platforms.create(1400,662,'ground3').setScale(1.5).refreshBody();
			this.platforms.create(1800,662,'ground3').setScale(1.5).refreshBody();
			this.platforms.create(600,668,'ground').setScale(1.5).refreshBody();
			
			this.platforms.create(0,246,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(490,246,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(900,246,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(1270,246,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(1760,246,'ground3').setScale(1.25).refreshBody();
			
			this.platforms.create(0,252,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(490,252,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(900,252,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(1270,252,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(1760,252,'ground2').setScale(1.25).refreshBody();
			
			this.platforms.create(210,450,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(700,450,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(1190,450,'ground3').setScale(1.25).refreshBody();
			this.platforms.create(1680,450,'ground3').setScale(1.25).refreshBody();

			this.platforms.create(210,456,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(700,456,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(1190,456,'ground2').setScale(1.25).refreshBody();
			this.platforms.create(1680,456,'ground2').setScale(1.25).refreshBody();
		}
		{
			this.doors=this.physics.add.staticGroup();
			this.doors.create(316.5,564,'door').setScale(0.9).refreshBody();
			this.doors.create(739.5,564,'door').setScale(0.9).refreshBody();
			this.doors.create(1514.5,564,'door').setScale(0.9).refreshBody();
			this.portes=this.physics.add.staticGroup();
			this.meta=this.physics.add.staticGroup();
			this.meta.create(1123,170,'door').setScale(0.9).refreshBody();
		}
		{
			this.player=this.physics.add.sprite(this.spawnx,this.spawny,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			//FALTEN ANIMACIONS
		}
		{
			this.enemy=this.physics.add.sprite(360,570,'enemy');
			this.enemy.setBounce(0.2);
			this.enemy.setCollideWorldBounds(true);
			this.enemy.setVelocityX(this.velocitatEnemy);
			this.enemy.depth=3;
			//FALTEN ANIMACIONS	
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.physics.add.collider(this.enemy,this.platforms);
			this.physics.add.collider(this.doors,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
			this.physics.add.overlap(this.player,this.doors,(body1,body2)=>this.hidebehind(body1,body2));
			this.physics.add.overlap(this.player,this.enemy,(body1,body2)=>this.collision(body1,body2));
			this.physics.add.overlap(this.player,this.meta,(body1,body2)=>this.guanya(body1,body2));
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
		if(this.cursors.left.isDown && !this.hidden){
			this.player.setVelocityX(-160);
			//animació aqui
		}
		else if(this.cursors.right.isDown && !this.hidden){
			this.player.setVelocityX(160);
			//animació aqui
		}
		else {
			this.player.setVelocityX(0);
			//animació aqui
		}
		if(this.cursors.up.isDown && this.player.body.touching.down){
			setTimeout(() => {
				if(!this.hidden){
					this.player.setVelocityY(-400);
					//animació aqui
				}
			},50)
		}

	}

	hidebehind(player,door){
		if(this.cursors.up.isDown && this.player.body.touching.down){	
			if(!this.hidden){
				this.hidden=true;
				console.log("hidden");
				//Rand para cambiar sprite de puerta a no molestar
				this.portes.create(door.x,door.y,'porta').setScale(0.19).refreshBody();
			}
		}
		else{
			if(this.hidden){
				setTimeout(() => {
					this.hidden=false;
					console.log("Not hidden");
					this.portes.remove(this.portes.getLast(true), true);
				},50)
			}
		}
	}

	collision(player,enemy){
		if(!this.hidden){
			console.log("tocat");
			this.nVides -= 1;
			if (this.nVides < 0){
				//PERDRE
			}
			else{
				//RESPAWNEAR
			}
			console.log(this.nVides);
		}
	}
	guanya(player,meta){
		if(this.cursors.up.isDown && this.player.body.touching.down){	
			if(!this.hidden){
				this.hidden=true;
				console.log("guanyes");
				this.portes.create(meta.x,meta.y,'porta').setScale(0.9).refreshBody();
				this.nVides += 1;
			}
		}
		//AQUI TINE QUE RESPAWNEAR EL PERSONAJE Y RESTAR VIDA O LO QUE HAGAMOS
	}
}