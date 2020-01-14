import {Component} from '@angular/core';
import {isBoolean, log} from "util";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})


export class HomePage {

    fightersNumber = 2;
    disableTableButton = true;
    warriorsList = [];
    warrior1 = {};
    warrior2 = {};
    twoWarriorsArray = [];
    canCreateNewWarriors = true;
    canGiveTwoWarriors = true;
    deadWarriors = [];

    constructor() {
    }


    getSelectedRadio(event) {
        this.fightersNumber = event.detail.value;
    }

    clearWarriorsList() {
        this.warriorsList.length = 0;
        this.twoWarriorsArray.length = 0;
        this.canCreateNewWarriors = true;
        this.deadWarriors.length = 0;
    }

    clearTwoWarriorsArray() {
        this.twoWarriorsArray.length = 0;
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getFighters(fightersNumber) {
        for (let i = 0; i < fightersNumber; i++) {
            this.warriorsList.push({
                id: i + 1,
                health: 5,
                sword: this.getRandom(1, 10),
                shield: this.getRandom(1, 10),
                wholeHealth: 5,
                selectedForFight: false
            });
            this.warriorsList[i].wholeHealth = this.warriorsList[i].wholeHealth + this.warriorsList[i].shield;
        }
        console.log('LIST of Warriors', this.warriorsList);
        this.canCreateNewWarriors = false;
    }

    getTwoFighters() {
        this.clearTwoWarriorsArray();
        this.warrior1 = this.warriorsList[Math.floor(Math.random() * this.warriorsList.length)];
        this.warrior2 = this.warriorsList[Math.floor(Math.random() * this.warriorsList.length)];
        if (this.warrior1 == this.warrior2) return this.getTwoFighters();
        this.twoWarriorsArray.push(this.warrior1, this.warrior2);
        console.log('Взято двух воинов - ', this.twoWarriorsArray);
        return this.twoWarriorsArray;
    }

    makeAttack() {
        this.canGiveTwoWarriors ? this.getTwoFighters() : null;
        this.canGiveTwoWarriors = false;

        let warrior1 = this.twoWarriorsArray[0];
        warrior1.selectedForFight = true;
        let warrior2 = this.twoWarriorsArray[1];
        warrior2.selectedForFight = true;
        console.log('Воины ', warrior1, warrior2);

        setTimeout(() => {
            this.attack(warrior1, warrior2);
        }, 1000);
    }

    attack(warrior1, warrior2) {
        let canFirstWarriorAttack = this.canFighterAttack(warrior1, warrior2);
        let canSecondWarriorAttack = false;

        if (canFirstWarriorAttack && this.warriorsList.length >= 1) {
            this.firstFighterAttack(warrior1, warrior2);
            setTimeout(() => {
                canSecondWarriorAttack = this.canFighterAttack(warrior1, warrior2);
            }, 400);
        }
        setTimeout(() => {
            if (canSecondWarriorAttack && this.warriorsList.length >= 1) {
                setTimeout(() => {
                    this.secondFighterAttack(warrior1, warrior2);
                    this.canFighterAttack(warrior1, warrior2); // for reload html (make dead warrior of current Round in current Round
                }, 400);
            }
        }, 600);
    }

    canFighterAttack(warrior1, warrior2) {
        let health1 = warrior1.wholeHealth;
        let health2 = warrior2.wholeHealth;

        if (health1 > 0 && health2 > 0) {
            return true;
        } else if (health1 <= 0) {
            this.warriorIsDead(warrior1);
            return false;
        } else {
            this.warriorIsDead(warrior2);
            return false;
        }
    }

    firstFighterAttack(warrior1, warrior2) {
        console.log('secondHealth = ', warrior2.wholeHealth);
        return warrior2.wholeHealth = warrior2.wholeHealth - warrior1.sword;
    }

    secondFighterAttack(warrior1, warrior2) {
        console.log('firstHealth = ', warrior1.wholeHealth);
        return warrior1.wholeHealth = warrior1.wholeHealth - warrior2.sword;
    }

    warriorIsDead(warrior) {
        this.deadWarriors.push(warrior);
        console.log('DeadWarriors ', this.deadWarriors);
        this.warriorsList.splice(this.warriorsList.indexOf(warrior), 1);
        //
        if (this.warriorsList.length <= 1) {
            //for speech
            var synth = window.speechSynthesis;
            let message = new SpeechSynthesisUtterance();
            message.lang = 'en-US';
            message.text = 'Oh, Great! Fight ends! We have the champion warrior with id' + this.warriorsList[0].id +
                '. His sword equals '+ this.warriorsList[0].sword + '. And his shield equals ' + this.warriorsList[0].shield;
            synth.speak(message);

            return console.log('Fight ends!', this.warriorsList.length)
        }
        else {
            this.canGiveTwoWarriors = true;
            console.log('END, warrior', warrior, ' is dead.');
            console.log('NEW LIST OF WARRIOR ', this.warriorsList);
        }
        ///
    }


    // for making all fight
    makeAllFight() {
        if (this.checkWarriorListLength()) {
            this.makeRepeat(0, 1);
            this.makeRepeat(3000, 2);
            this.makeRepeat(6000, 3);
            this.makeRepeat(9000, 4);
            this.makeRepeat(12000, 5);
            this.makeRepeat(15000, 6);
            this.makeRepeat(18000, 7);
            this.makeRepeat(21000, 8);
            this.makeRepeat(24000, 9);
            this.makeRepeat(27000, 10);
            this.makeRepeat(30000, 11);
            this.makeRepeat(33000, 12);
            this.makeRepeat(36000, 13);
            this.makeRepeat(39000, 14);
            this.makeRepeat(42000, 15);
            this.makeRepeat(45000, 16);
            this.makeRepeat(48000, 17);
            this.makeRepeat(51000, 18);
            this.makeRepeat(54000, 19);
            this.makeRepeat(57000, 20);
        }
    }

    makeRepeat(ms, roundNumber) {
        if (this.checkWarriorListLength()) {
            setTimeout(() => {
                this.repeatMakeAttack(roundNumber);
            }, ms)
        }
    }

    checkWarriorListLength() {
        return this.warriorsList.length > 1 ? true : false;
    }

    repeatMakeAttack(roundNumber) {
        // console.log('warriorList ', this.warriorsList, this.warriorsList.length);
        if (this.checkWarriorListLength()) {
            console.log('[', roundNumber, '] ROUND', roundNumber);
            this.makeAttack();
        }
    }

}

// TODO: do tournament-table-component - рисуй с помощью тире и переменных (с id бойцов) + на картку бойца добавь id

// TODO: START WITH 'ng serve'
