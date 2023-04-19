import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
    frames : number[][] = [];
    cumulativeScores=[]
    gameOver:boolean = false
    pins:number[]= []
    rolls:number=0
    totalScore:number
    lastRoll:number
	audio = new Audio('http://ricostardeluxe.free.fr/STRIKE-split.wav');
    constructor(){
    }

    addScore(pinsHits){
    	this.audio.play()
		this.frames = this.updateFrames(this.rolls, pinsHits, this.frames);
		this.cumulativeScores = this.updateCumulativeScore(this.rolls, this.frames, this.cumulativeScores, this.pins, pinsHits)
    	this.totalScore = this.cumulativeScores.slice(-1)[0]
		this.gameOver = this.isGameOver(this.rolls, pinsHits, this.pins)
		this.pins = this.pins.concat(pinsHits)
		this.rolls = this.updateCurrentRoll(this.rolls, pinsHits)
    }
    restart(){
		this.frames = [];
		this.cumulativeScores =[]
		this.gameOver = false
		this.rolls = 0
		this.pins = []
		this.totalScore = 0
    }

   	// chack for end game
    isGameOver(rolls, lastScore, pins){
	  	const GameNotOver = rolls < 19 || (rolls === 19 && (this.isSpare(lastScore, pins.slice(-1)[0]) || this.isStrike(pins.slice(-1)[0])))
	  	return !GameNotOver
	}

	updateFrames(rolls, lastScore, frames) {
	  	if (this.isEven(rolls) && !this.isBonusRoll(rolls)) {
	    	return frames.concat([[lastScore]])
	  	} else {
	  		console.log('newframe')
	    	const newFrameScore = frames[this.getFrameIndex(frames)].concat([lastScore])
	    	return frames.slice(0, this.getFrameIndex(frames)).concat([newFrameScore])
	  	}
	}

	//chekh if is the bonus roll the 3 of last frame
	isBonusRoll(rolls){return rolls === 20}

	getFrameIndex(frames) { return frames.length - 1}

	//is first roll of frame or second
	isEven(number){return number % 2 === 0}

	//chekh if is Spare 
	isSpare(roll1, roll2) {return roll1 + roll2 === 10}

	//Bonus Strike 
	strikeBonus(roll1, roll2) {return 10 + roll1 + roll2}

	//chekh if is Strike 
	isStrike(pins) {return pins === 10 }

	//calculate frame score
    updateCumulativeScore(rolls, frames, cumulativeScores, pins, lastScore){
		const currentScore = cumulativeScores.slice(-1)[0] || 0;
		//point case
		if ((!this.isEven(rolls) && !this.isStrike(lastScore) && !this.isSpare(pins.slice(-1)[0], lastScore)) || this.isBonusRoll(rolls)) {
		    	
		    const frameScore = this.isBonusRoll(rolls) ?
		      this.frames[this.getFrameIndex(frames)][0] + this.frames[this.getFrameIndex(frames)][0] + lastScore
		      : this.frames[this.getFrameIndex(frames)][0] + lastScore

		    //the last frame
		    if (this.isStrike(pins.slice(-1)[0]) && !this.isStrike(pins.slice(-2)[0]) && rolls === 19){
		     return cumulativeScores}
		    if (this.isStrike(pins.slice(-2)[0]) && rolls > 2 && rolls < 20) {
				const bonus = this.strikeBonus(pins.slice(-1)[0], lastScore)
				const previousFrame = bonus + currentScore
				return this.isStrike(pins.slice(-1)[0]) && rolls === 19 ?
		        	cumulativeScores.concat(previousFrame)
		        	: cumulativeScores.concat(previousFrame, frameScore + previousFrame)
		    }

		    const updatedFrameScores = cumulativeScores.concat(currentScore + frameScore)
		    return updatedFrameScores
		}
		//strike case 
		else if (this.isStrike(pins.slice(-2)[0]) && rolls > 2 && rolls < 20) {  
		    const bonus = this.strikeBonus(pins.slice(-1)[0], lastScore)
		    return cumulativeScores.concat(currentScore + bonus)
  		}
		//Spire case
  		else if (this.isEven(rolls) && this.isSpare(pins.slice(-2)[0], pins.slice(-1)[0])) { 
		    const spareFrame = 10 + lastScore
		    return cumulativeScores.concat(currentScore + spareFrame)
	 	}
	  	return cumulativeScores
	}
	// increment rolls after each roll
	updateCurrentRoll(rolls, lastScore) {
	  	if (this.isStrike(lastScore) && this.isEven(rolls) && rolls < 18) {
	    	return rolls + 2
	  	} else {
	    	return rolls + 1
	  	}
	}
}
