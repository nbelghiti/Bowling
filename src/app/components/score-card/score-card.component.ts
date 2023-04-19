import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent {
  @Input() frames;
  @Input() cumulativeScores;
  @Input() totalScore;

  //renderScores for each frame /roll
	renderScores(frame, roll) {
    if(this.frames[frame]){
      if(this.frames[frame].length === 1 && this.frames[frame][roll]===10 && roll===0){
        return 'X' 
      }else if(this.frames[frame].length > 1 && this.isSpare(this.frames[frame][1], this.frames[frame][0]) && roll===1){
        return '/' 
      }else if(frame == 9 && this.frames[frame]){
        if(this.frames[frame][roll] == 10) return 'X' 

      }
      return this.frames[frame] ? this.frames[frame][roll] : ''
    }else return this.frames[frame] ? this.frames[frame][roll] : ''
    
  }
  isSpare(roll1, roll2) {return roll1 + roll2 === 10}

}