import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})

export class ControlsComponent {
	
	@Input() gameOver: boolean;
	@Input() lastRoll:number;
	@Input() rolls: number;
	@Input() frames;
	@Output() restart = new EventEmitter();
	@Output() addScore = new EventEmitter<number>();

	myPinsHits
	moreThanTen = false
	isNaNumber = false
	negativNumber = false

	handleRestart(){
		this.restart.emit();
		this.onInput()
	}

	//check if pinsHits is Valid
	handleClick(pinsHits){
		const regex = /^[0-9]+$/;
		if(pinsHits<0){
			this.negativNumber = true
		} else if(this.isValid(pinsHits)){
			this.moreThanTen = true
		}else if(typeof(pinsHits) != 'number' || !regex.test(pinsHits+'') ){
			this.isNaNumber = true
		} else this.addScore.emit(pinsHits);
	}

	isValid(pinsHits) {
		if (this.gameOver) return true
	    if (this.rolls % 2 === 0 || this.rolls === 0) return false
	    if (this.rolls === 19 && this.lastRoll === 10) return false
	    return this.lastRoll + pinsHits > 10
  	}

	isValidHits(roll1, roll2) {return roll1 + roll2 > 10}

	isEven(number){ return number % 2 === 0}

	onInput(){
		this.moreThanTen = false
		this.isNaNumber = false
		this.negativNumber = false
	}
	isEmpty(){
		return this.myPinsHits == undefined
	}
}
