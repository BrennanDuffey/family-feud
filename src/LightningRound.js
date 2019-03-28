import Round from './Round';
import domUpdates from './domUpdates';

class LightningRound extends Round {
  
  constructor(id, survey) {
    super(id, survey);
  }

  submitGuess(player, guess) {
    for (let response of this.responses) {
      if (response.answer.toLowerCase() === guess) {
        player.updateScore(2 * response.respondents);
        this.responses = this.responses.filter(response => {
          return response.answer.toLowerCase() !== guess
        });
        domUpdates.revealResponse(response.answer);
        domUpdates.updateScores(player);
        if (this.responses.length === 0) {
          this.isFinished = true;
        }
        break;
      } else if (this.responses.indexOf(response) === this.responses.length - 1) {
        player.updateScore(-20);
      }
    }
  }

}

export default LightningRound;