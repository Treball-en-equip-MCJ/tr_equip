class PlatformScene extends Phaser.Scene {
	constructor(){
		super('PlatformScene');
		this.veil=null;
		this.platforms=null;
		this.player=null;
		this.cursors=null;
		this.doors=null;
		this.keys=null;
		this.claus_tot=0;
		this.stairs=null;
		this.hidden=false;
		this.portes=null; //Ajuda per crear les portes tancades
		this.escales=null; //Escales repartides al mapa
		this.meta=null; //Porta final
		this.velocitatEnemy1=40;
		this.velocitatEnemy2=40;
		this.velocitatEnemy3=40;
		this.velocitatEnemy4=40;
		this.velocitatEnemy5=40;
		this.velocitatEnemy6=40;
		this.velocitatEnemy7=40;
		this.velocitatEnemy8=40;
		this.velocitatEnemy9=40;
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
		this.spawnx=100;
		this.spawny=555;
		this.pausat=false;
		this.botoResume="";
		this.botoSortir ="";
		this.explain="";
	}
	
	preload(){
		this.load.image('background','../resources/fondo grande.png'); //Modificar amb un fons sense llocs per a les portes
		this.load.image('ground','../resources/ground.png');//Modificar amb el sprite del terra
		this.load.image('ground2','../resources/ground2.png');
		this.load.image('ground3','../resources/ground3.png');
		this.load.image('key','../resources/key.png');
		this.load.image('door','../resources/door.png');
		this.load.image('porta','../resources/porta1.png'); 
		this.load.image('porta2','../resources/porta2.png'); 
		this.load.image('stair','../resources/escala.png'); 
		this.load.spritesheet('dude','../resources/guy5.png',{frameWidth:39,frameHeight:43}); //Modificar amb el personatge
		this.load.spritesheet('enemy','../resources/monster2.png',{frameWidth:32,frameHeight:32});
		this.load.image('pause','../resources/Pause.png');
	}

	create(){
		this.add.image(600,350,'background').setScale(0.6);	
		{//AFEGIM LES SPRITES DE LES ESCALES
			this.add.image(457,540,'stair').setScale(0.2);
			this.add.image(1437,540,'stair').setScale(0.2);
			this.add.image(947,540,'stair').setScale(0.2);
			this.add.image(248,335,'stair').setScale(0.2);	
			this.add.image(1517,335,'stair').setScale(0.2);
		}
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
			this.explain = this.add.text(700,50, 'Prem SHIFT per pausar', {fill: '#fff'} ).setScale(1.5);
			this.explain.setBackgroundColor('#7b3046');
		}
		{//CREEM LES CLAUS I LES PORTES
			this.keys=this.physics.add.staticGroup();
			var keySpawn=Math.random()*10;
			console.log(keySpawn)
			if(keySpawn<3){
				this.keys.create(50,170,'key').setScale(0.3).refreshBody();
				this.keys.create(500,170,'key').setScale(0.3).refreshBody();
				this.keys.create(1570,564,'key').setScale(0.3).refreshBody();
			}
			else if(keySpawn>=3 && keySpawn<6){
				this.keys.create(800,170,'key').setScale(0.3).refreshBody();
				this.keys.create(750,370,'key').setScale(0.3).refreshBody();
				this.keys.create(1570,564,'key').setScale(0.3).refreshBody();
			}
			else{
				this.keys.create(50,370,'key').setScale(0.3).refreshBody();
				this.keys.create(500,170,'key').setScale(0.3).refreshBody();
				this.keys.create(1000,564,'key').setScale(0.3).refreshBody();
			}

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
			this.meta.create(1091.5,155,'porta2').setScale(0.19).refreshBody();
		}
		{
			this.player=this.physics.add.sprite(this.spawnx,this.spawny,'dude');
			this.player.setBounce(0.2);
			this.player.setCollideWorldBounds(true);
			
			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'turn',
				frames: [ { key: 'dude', frame: 8 } ],
				frameRate: 10
			});

			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
				frameRate: 10,
				repeat: -1
			});
		}
		{
			this.enemy1=this.physics.add.sprite(300,600,'enemy');
			this.enemy1.setBounce(0.2);
			this.enemy1.setCollideWorldBounds(true);
			this.enemy1.setVelocityX(this.velocitatEnemy1);
			this.enemy1.depth=3;
			this.arrayenemys.push(this.enemy1);
			this.enemy2=this.physics.add.sprite(1200,600,'enemy');
			this.enemy2.setBounce(0.2);
			this.enemy2.setCollideWorldBounds(true);
			this.enemy2.setVelocityX(this.velocitatEnemy2);
			this.enemy2.depth=3;
			this.arrayenemys.push(this.enemy2);
			this.enemy3=this.physics.add.sprite(60,400,'enemy');
			this.enemy3.setBounce(0.2);
			this.enemy3.setCollideWorldBounds(true);
			this.enemy3.setVelocityX(this.velocitatEnemy3);
			this.enemy3.depth=3;
			this.arrayenemys.push(this.enemy3);
			this.enemy4=this.physics.add.sprite(560,400,'enemy');
			this.enemy4.setBounce(0.2);
			this.enemy4.setCollideWorldBounds(true);
			this.enemy4.setVelocityX(this.velocitatEnemy4);
			this.enemy4.depth=3;
			this.arrayenemys.push(this.enemy4);
			this.enemy5=this.physics.add.sprite(1050,400,'enemy');
			this.enemy5.setBounce(0.2);
			this.enemy5.setCollideWorldBounds(true);
			this.enemy5.setVelocityX(this.velocitatEnemy5);
			this.enemy5.depth=3;
			this.arrayenemys.push(this.enemy5);
			this.enemy6=this.physics.add.sprite(30,190,'enemy');
			this.enemy6.setBounce(0.2);
			this.enemy6.setCollideWorldBounds(true);
			this.enemy6.setVelocityX(this.velocitatEnemy6);
			this.enemy6.depth=3;
			this.arrayenemys.push(this.enemy6);
			this.enemy7=this.physics.add.sprite(360,190,'enemy');
			this.enemy7.setBounce(0.2);
			this.enemy7.setCollideWorldBounds(true);
			this.enemy7.setVelocityX(this.velocitatEnemy7);
			this.enemy7.depth=3;
			this.arrayenemys.push(this.enemy7);
			this.enemy8=this.physics.add.sprite(710,190,'enemy');
			this.enemy8.setBounce(0.2);
			this.enemy8.setCollideWorldBounds(true);
			this.enemy8.setVelocityX(this.velocitatEnemy8);
			this.enemy8.depth=3;
			this.arrayenemys.push(this.enemy8);
			this.enemy9=this.physics.add.sprite(1000,190,'enemy');
			this.enemy9.setBounce(0.2);
			this.enemy9.setCollideWorldBounds(true);
			this.enemy9.setVelocityX(this.velocitatEnemy9);
			this.enemy9.depth=3;
			this.arrayenemys.push(this.enemy9);

			this.anims.create({
				key: 'enemy-left',
				frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 5}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'enemy-right',
				frames: this.anims.generateFrameNumbers('enemy', { start: 6, end: 11}),
				frameRate: 10,
				repeat: -1
			});

			this.enemy1.anims.play('enemy-right', true);
			this.enemy2.anims.play('enemy-right', true);
			this.enemy3.anims.play('enemy-right', true);
			this.enemy4.anims.play('enemy-right', true);
			this.enemy5.anims.play('enemy-right', true);
			this.enemy6.anims.play('enemy-right', true);
			this.enemy7.anims.play('enemy-right', true);
			this.enemy8.anims.play('enemy-right', true);
			this.enemy9.anims.play('enemy-right', true);
			
		}
		{
			this.physics.add.collider(this.player,this.platforms);
			this.physics.add.collider(this.doors,this.platforms);
			this.physics.add.collider(this.keys,this.platforms);
			this.cursors=this.input.keyboard.createCursorKeys();
			this.physics.add.overlap(this.player,this.doors,(body1,body2)=>this.hidebehind(body1,body2));
			this.physics.add.overlap(this.player,this.meta,(body1,body2)=>this.guanya(body1,body2));
			this.physics.add.overlap(this.player,this.keys,(body1,body2)=>this.agafa_key(body1,body2));
			for (let i=0; i<this.arrayenemys.length; i++){
				this.physics.add.collider(this.arrayenemys[i],this.platforms);
				this.physics.add.overlap(this.player,this.arrayenemys[i],(body1,body2)=>this.collision(body1,body2));
			}
		}
		{
			setInterval(() => {  //DEFINEIX MOVIMENT DE ENEMY 1
				if (this.velocitatEnemy1 > 0){
					this.velocitatEnemy1 = -40;
					this.enemy1.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy1 = 40;
					this.enemy1.anims.play('enemy-right', true);
				}
				this.arrayenemys[0].setVelocityX(this.velocitatEnemy1);
			}, 17000);
			
			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 2
				if (this.velocitatEnemy2 > 0){
					this.velocitatEnemy2 = -40;
					this.enemy2.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy2 = 40;
					this.enemy2.anims.play('enemy-right', true);
				}
				this.arrayenemys[1].setVelocityX(this.velocitatEnemy2);
			}, 10500);

			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 3
				if (this.velocitatEnemy3 > 0){
					this.velocitatEnemy3 = -40;
					this.enemy3.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy3 = 40;
					this.enemy3.anims.play('enemy-right', true);
				}
				this.arrayenemys[2].setVelocityX(this.velocitatEnemy3);
			}, 8000);

			setInterval(() => {  //DEFINEIX MOVIMENT DE ENEMY 4
				if (this.velocitatEnemy4 > 0){
					this.velocitatEnemy4 = -40;
					this.enemy4.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy4 = 40;
					this.enemy4.anims.play('enemy-right', true);
				}
				this.arrayenemys[3].setVelocityX(this.velocitatEnemy4);
			}, 8000);
			
			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 5
				if (this.velocitatEnemy5 > 0){
					this.velocitatEnemy5 = -40;
					this.enemy5.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy5 = 40;
					this.enemy5.anims.play('enemy-right', true);
				}
				this.arrayenemys[4].setVelocityX(this.velocitatEnemy5);
			}, 8200);

			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 6
				if (this.velocitatEnemy6 > 0){
					this.velocitatEnemy6 = -40;
					this.enemy6.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy6 = 40;
					this.enemy6.anims.play('enemy-right', true);
				}
				this.arrayenemys[5].setVelocityX(this.velocitatEnemy6);
			}, 3200);

			setInterval(() => {  //DEFINEIX MOVIMENT DE ENEMY 7
				if (this.velocitatEnemy7 > 0){
					this.velocitatEnemy7 = -45;
					this.enemy7.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy7 = 45;
					this.enemy7.anims.play('enemy-right', true);
				}
				this.arrayenemys[6].setVelocityX(this.velocitatEnemy7);
			}, 7000);
			
			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 8
				if (this.velocitatEnemy8 > 0){
					this.enemy8.anims.play('enemy-left', true);
					this.velocitatEnemy8 = -40;
				}
				else{
					this.velocitatEnemy8 = 40;
					this.enemy8.anims.play('enemy-right', true);
				}
				this.arrayenemys[7].setVelocityX(this.velocitatEnemy8);
			}, 13000);

			setInterval(() => {   //DEFINEIX MOVIEMNT DE ENEMY 9
				if (this.velocitatEnemy9 > 0){
					this.velocitatEnemy9 = -40;
					this.enemy9.anims.play('enemy-left', true);
				}
				else{
					this.velocitatEnemy9 = 40;
					this.enemy9.anims.play('enemy-right', true);
				}
				this.arrayenemys[8].setVelocityX(this.velocitatEnemy9);
			}, 11500);
		}
		this.botoResume = this.add.text(700,300, 'Prem SHIFT per continuar', {fill: '#fff'} ).setScale(1.5);
		this.botoResume.setBackgroundColor('#7b3046');
		this.botoResume.visible=false;
		this.botoSortir = this.add.text(700,400, 'Prem SPACE per sortir', {fill: '#fff'} ).setScale(1.5);
		this.botoSortir.setBackgroundColor('#7b3046');
		this.botoSortir.visible=false;
	}

	update(){
		if(this.cursors.left.isDown && !this.hidden){
			this.player.setVelocityX(-160);
			this.player.anims.play('left', true);
			
		}
		else if(this.cursors.right.isDown && !this.hidden){
			this.player.setVelocityX(160);
			this.player.anims.play('right', true);
		}
		else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}
		if(this.cursors.up.isDown && this.player.body.touching.down){
			setTimeout(() => {
				if(!this.hidden){
					this.player.setVelocityY(-400);
				}
			},50)
		}
		if(this.cursors.shift.isDown){
			if(!this.pausat){
				setTimeout(() => {
					console.log("pausa");
					this.createPauseScreen();
				},200)
			}
			if(this.pausat){
				setTimeout(() => {	
					console.log("no pausa");
					this.removePauseScreen();
				},200)
			}
		}
		if(this.cursors.space.isDown){
			if(this.pausat){
				setTimeout(()=>loadpage("../"),100)
			}
		}

	}

	hidebehind(player,door){
		if(this.cursors.up.isDown && this.player.body.touching.down){	
			if(!this.hidden){
				this.hidden=true;
				console.log("hidden");
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
			setTimeout(()=>loadpage("./phasergamePlatform.html"),100)
		}
	}
	guanya(player,meta){
		if(this.cursors.up.isDown && this.player.body.touching.down && this.claus_tot==3){	
			if(!this.hidden){
				this.hidden=true;
				console.log("guanyes");
				this.portes.create(meta.x,meta.y,'door').setScale(0.9).refreshBody();
				this.physics.pause();
				this.botoResume = this.add.text(700,300, 'HAS GUANYAT', {fill: '#fff'} ).setScale(1.5);
				this.botoResume.setBackgroundColor('#7b3046');
				setTimeout(()=>loadpage("../"),1000)
			}
		}
	}
	agafa_key(player,key){
		this.claus_tot++;
		console.log(this.claus_tot)
		key.disableBody(true,true)
	}
	createPauseScreen(){
		this.botoResume.visible=true;
		this.botoSortir.visible=true;
		this.explain.visible=false;
		this.physics.pause();
		this.pausat=true;
	}
	removePauseScreen(){
		this.botoResume.visible=false;
		this.botoSortir.visible=false;
		this.explain.visible=true;
		this.physics.resume();
		this.pausat=false;
	}
}