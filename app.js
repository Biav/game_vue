new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        attackPlayer: 3,
        attackMonster: 4,
        attackTotal: 10,
        totalMonster: 10,
        attackSpecial: 12,
        specialUse: false,
        healthUse: false,
        turnLog: [],
        result: '',
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turnLog = [];
            this.isGameRunning = true;
            this.specialUse = false;
            this.healthUse = false;
            this.result = '';
        },
        attack: function() {

            if(this.monsterHealth > 0) { 
                var attackPlayer = this.randomAttack(this.attackPlayer,this.attackTotal);
                this.monsterHealth -= attackPlayer;
                this.logsTurn('Player', attackPlayer);
                if(this.monsterHealth < 0) { 
                    this.checkAttack();
                }
            } 

            if(this.playerHealth > 0) { 
                var attackMonster = this.randomAttack(this.attackMonster,this.totalMonster);
                this.playerHealth -= attackMonster;
                this.logsTurn('Monster', attackMonster);
                if(this.playerHealth < 0) { 
                    this.checkAttack();
                }
            } 

            if(this.result != '') {
                this.display(this.result);
                console.log(this.playerHealth + " - " + this.monsterHealth );
                return;
            }

            this.checkAttack();

        },
        normalAttack: function() {
            this.attackPlayer = 3;
            this.attackTotal = 10;

            this.attack();
        },
        specialAttack: function() {
            var self = this;
            self.attackPlayer = 5;
            self.attackTotal = 12;
            self.specialUse = true;

            setTimeout(function(){
                self.specialUse = false;
            },10000);

            this.attack();
        },
        randomAttack: function (max, min) {
            return Math.floor(Math.random() * max) + min;
        },
        heal: function() {
            var heal = 20;
            var self = this;
            if(this.playerHealth < 100) {
                var totalHealth = (self.playerHealth + heal);
                self.playerHealth = (totalHealth <= 100)?totalHealth:100;
                self.healthUse = true;

                setTimeout(function(){
                    self.healthUse = false;
                },10000);
            }
        },
        logsTurn: function(player, attack){
            var isPlayer = (player === 'Player')?true:false;
            this.turnLog.unshift({
                isPlayer: isPlayer,
                text: 'The ' + player + ' hit for '+ attack
            });
        },
        display: function (result) {
            this.isGameRunning = false;
            alert("You " + result);
            return;
        },
        stopGame: function() {
            let pause = confirm("Do you wanna give up?");
            if(pause){
                this.startGame();
            }
        },
        checkAttack: function() {
            if(this.monsterHealth <= 0 && this.playerHealth > 0) {
                this.result = 'Win'
            } else if(this.playerHealth <= 0 && this.monsterHealth > 0) { 
                this.result = 'Lost';
            } else if(this.playerHealth <= 0 && this.monsterHealth <= 0){
                this.result = 'Deadlocked';
            }
        }
    }
});