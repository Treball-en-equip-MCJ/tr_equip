class PlatformScene extends Phaser.Scene {
	constructor(){
		super('PlatformScene');
		this.platforms=null;
		this.player=null;
		this.cursors=null;
		this.doors=null;
		this.stairs=null;
		this.hidden=false;
		this.portes=null; //Ajuda per crear les portes tancades
		this.escales=null; //Escales repartides al mapa
		this.meta=null; //Porta final
		this.velocitatEnemy1=40;
		this.velocitatEnemy2=40;
		this.velocitatEnemy3=40;
		this.enemicDreta=true
		this.enemy1=null;
		this.enemy2=null;
		this.enemy3=null;
		this.enemy4=null;
		this.enemy5=null;
		this.enemy6=null;
		this.enemy7=null;
		this.enemy8=null;
		this.enemy9=null;
		this.arrayenemys=[]
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
			
			this.doors.create(387,155,'door').setScale(0.9).refreshBody();
			this.doors.create(105,155,'door').setScale(0.9).refreshBody();
			this.doors.create(739.5,155,'door').setScale(0.9).refreshBody();

			this.doors.create(668.5,359,'door').setScale(0.9).refreshBody();
			this.doors.create(1232,359,'door').setScale(0.9).refreshBody();
			this.doors.create(175,359,'door').setScale(0.9).refreshBody();
			
			this.portes=this.physics.add.staticGroup();
			this.meta=this.physics.add.staticGroup();
			this.meta.create(1091.5,155,'door').setScale(0.9).refreshBody();
		}
		{
			this.player=this.physics.add.sprite(this.spawnx,this.spawny,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			//FALTEN ANIMACIONS
		}
		{
			this.enemy1=this.physics.add.sprite(200,570,'enemy');
			this.enemy1.setBounce(0.2);
			this.enemy1.setCollideWorldBounds(true);
			this.enemy1.setVelocityX(this.velocitatEnemy1);
			this.enemy1.depth=3;
			this.arrayenemys.push(this.enemy1);
			this.enemy2=this.physics.add.sprite(960,570,'enemy');
			this.enemy2.setBounce(0.2);
			this.enemy2.setCollideWorldBounds(true);
			this.enemy2.setVelocityX(this.velocitatEnemy1);
			this.enemy2.depth=3;
			this.arrayenemys.push(this.enemy2);
			this.enemy3=this.physics.add.sprite(100,360,'enemy');
			this.enemy3.setBounce(0.2);
			this.enemy3.setCollideWorldBounds(true);
			this.enemy3.setVelocityX(this.velocitatEnemy2);
			this.enemy3.depth=3;
			this.arrayenemys.push(this.enemy3);
			this.enemy4=this.physics.add.sprite(600,360,'enemy');
			this.enemy4.setBounce(0.2);
			this.enemy4.setCollideWorldBounds(true);
			this.enemy4.setVelocityX(this.velocitatEnemy2);
			this.enemy4.depth=3;
			this.arrayenemys.push(this.enemy4);
			this.enemy5=this.physics.add.sprite(1160,360,'enemy');
			this.enemy5.setBounce(0.2);
			this.enemy5.setCollideWorldBounds(true);
			this.enemy5.setVelocityX(this.velocitatEnemy2);
			this.enemy5.depth=3;
			this.arrayenemys.push(this.enemy5);
			this.enemy6=this.physics.add.sprite(100,150,'enemy');
			this.enemy6.setBounce(0.2);
			this.enemy6.setCollideWorldBounds(true);
			this.enemy6.setVelocityX(this.velocitatEnemy3);
			this.enemy6.depth=3;
			this.arrayenemys.push(this.enemy6);
			this.enemy7=this.physics.add.sprite(300,150,'enemy');
			this.enemy7.setBounce(0.2);
			this.enemy7.setCollideWorldBounds(true);
			this.enemy7.setVelocityX(this.velocitatEnemy3);
			this.enemy7.depth=3;
			this.arrayenemys.push(this.enemy7);
			this.enemy8=this.physics.add.sprite(650,150,'enemy');
			this.enemy8.setBounce(0.2);
			this.enemy8.setCollideWorldBounds(true);
			this.enemy8.setVelocityX(this.velocitatEnemy1);
			this.enemy8.depth=3;
			this.arrayenemys.push(this.enemy8);
			this.enemy9=this.physics.add.sprite(1060,150,'enemy');
			this.enemy9.setBounce(0.2);
			this.enemy9.setCollideWorldBounds(true);
			this.enemy9.setVelocityX(this.velocitatEnemy1);
			this.enemy9.depth=3;
			this.arrayenemys.push(this.enemy9);
			//FALTEN ANIMACIONS	
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.physics.add.collider(this.doors,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
			this.physics.add.overlap(this.player,this.doors,(body1,body2)=>this.hidebehind(body1,body2));
			this.physics.add.overlap(this.player,this.meta,(body1,body2)=>this.guanya(body1,body2));
			for (let i=0; i<this.arrayenemys.length; i++){
				this.physics.add.collider(this.arrayenemys[i],this.platforms);
				this.physics.add.overlap(this.player,this.arrayenemys[i],(body1,body2)=>this.collision(body1,body2));
			}
		}
		
		setInterval(() => {  //DEFINEIX MOVIMENT DE ENEMY 1,2,8,9
			if (this.velocitatEnemy1 > 0){
				this.velocitatEnemy1 = -40;
			}
			else{
				this.velocitatEnemy1 = 40;
			}
			this.arrayenemys[0].setVelocityX(this.velocitatEnemy1);
			this.arrayenemys[1].setVelocityX(this.velocitatEnemy1);
			this.arrayenemys[7].setVelocityX(this.velocitatEnemy1);
			this.arrayenemys[8].setVelocityX(this.velocitatEnemy1);
		}, 10000);
		
		setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 3,4,5
			if (this.velocitatEnemy2 > 0){
				this.velocitatEnemy2 = -40;
			}
			else{
				this.velocitatEnemy2 = 40;
			}
			this.arrayenemys[2].setVelocityX(this.velocitatEnemy2);
			this.arrayenemys[3].setVelocityX(this.velocitatEnemy2);
			this.arrayenemys[4].setVelocityX(this.velocitatEnemy2);
		}, 6000);

		setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 6,7
			if (this.velocitatEnemy3 > 0){
				this.velocitatEnemy3 = -40;
			}
			else{
				this.velocitatEnemy3 = 40;
			}
			this.arrayenemys[5].setVelocityX(this.velocitatEnemy3);
			this.arrayenemys[6].setVelocityX(this.velocitatEnemy3);
		}, 4000);

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
				this.portes.create(meta.x,meta.y,'porta2').setScale(0.19).refreshBody();
				this.nVides += 1;
			}
		}
		//AQUI TINE QUE RESPAWNEAR EL PERSONAJE Y RESTAR VIDA O LO QUE HAGAMOS
	}
}