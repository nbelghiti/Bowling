import { Component, OnInit} from '@angular/core';
import { Game } from './model/game'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'bowling-app';
  	private rolls: number[] = [];
	rollInput=0
	game :Game = {
		pinCount : 10,
		frameNumber : 1,
		rollNumber : 1,
		gameover : false,
		frameScore : {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[], 9:[], 10:[]},
		totalScore : [],
		runningTotal : [],
		bonus : {1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:''},
		bonusNextFrame : {1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:''}
	}
	frameNumber = 1;
	ngOnInit() {
	    // ...
  	}
	constructor(){
	}

	setFrameScore() {
		let frameScor = ''
		if(this.game.frameScore[this.game.frameNumber].length > 0)
		for (var i = this.game.frameScore[this.game.frameNumber].length - 1; i >= 0; i--) {
			frameScor = frameScor + '' + this.game.frameScore[this.game.frameNumber][i]
		}
	}

	roll() {
		let pinsHit = this.rollInput
		console.log("rollInput : ", this.rollInput)
		console.log("isRollValid : ", this.isRollValid(pinsHit))
		if(this.isRollValid(pinsHit)){
			if (this.game.frameNumber == 10){
				this.finalFrame(pinsHit);
			}
			if (pinsHit === 10 && this.game.rollNumber === 1) {
				this.game.frameScore[this.game.frameNumber].push("X");
				this.game.bonus[this.game.frameNumber] = 'Strike';
				this.game.bonusNextFrame[this.game.frameNumber +1] = 'StrikeFrame';
				this.nextFrame();
			} else if((pinsHit + this.firstRollScore()[0]) === '10' && this.game.rollNumber > 1) {
				this.game.frameScore[this.game.frameNumber].push("/");
				this.game.bonus[this.game.frameNumber] = 'Spare';
				this.game.bonusNextFrame[this.game.frameNumber +1] = 'SpareFrame';
				this.nextFrame();
			} else {
				this.throw(pinsHit);
				this.game.frameScore[this.game.frameNumber].push(pinsHit+'')
				if (this.isFrameComplete()){
				  //this.nextFrame();
				} else {
				}
			}
		}
		this.setFrameScore()
		console.log('this.game',this.game)
	}

	firstRollScore() {
		return this.game.frameScore[this.game.frameNumber].slice(0,1)
	}

	finalFrame(pinsHit: number) {
			console.log("finalFrame")
	}

	throw(pinsHit: number) {
		this.game.rollNumber ++;
		this.game.pinCount -= pinsHit;
	}

	isFrameComplete() {
		if(this.game.rollNumber > 2){
			return true;
		} else {
			return false;
		}
	}
	nextFrame() {
		//var spareBonus = this.firstRollScore();
		this.game.frameNumber ++;
		//this.rollReset();
		//this.calculateScore();
		//this.sumGame();
		//this.calculateBonus(this.totalScore,spareBonus);
		if(this.over()){
			console.log("Game Over")
			//console.log("Final Score" +" "+ this.sumGame())
			return;
		}
	}

	isRollValid(pinsHit: number) {
	  	if (pinsHit > this.game.pinCount ) {
	    	throw new Error("only 10 pins per frame");
	    	return false;
	 	}else if(this.game.frameNumber > 10){
	    	this.game.gameover = true;
	    	throw new Error("Game Over");
	    	return false;
	  	}else{
	    	return true;
	  	}
	}
	over(){
	  	if (this.game.frameNumber > 10){
	    	return true;
	  	}
	}
}

