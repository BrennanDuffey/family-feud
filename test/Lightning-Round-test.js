import chai from 'chai';
import spies from 'chai-spies';
import Game from '../src/Game';
import Round from '../src/Round';
import Player from '../src/Player';
import domUpdates from '../src/domUpdates';
import data from '../src/data';


chai.use(spies);
const assert = chai.assert;

describe('Round', () => {

  beforeEach(function() {
    chai.spy.on(domUpdates, 'updateScores', () => true);
    chai.spy.on(domUpdates, 'revealResponse', () => true);
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
  });

  it('should be able to instantiate a new round', () => {
    let round = new Round(0 , {});
    assert.instanceOf(round, Round);
  });


  it('should have a question', () => {
    let round = new Round({ question: 'this is a question' });
    assert.equal(round.question, 'this is a question');
  });


  it('should have a property of isFinished that starts off false', () => {
    let round = new Round({});
    assert.equal(round.isFinished, false);
  });

  it('if guess is correct that response should be filtered from the array', () => {
    let round = new Round({});
    let player = new Player();
    round.responses = [{answer:'Watch'}];
    round.submitGuess(player, 'watch');
    assert.equal(round.responses.length, 0);
  });

  it('should change isFinished to true when entire response array is filtered', () => {
    let round = new Round({});
    let player = new Player('Brennan');
    round.responses = [{answer:'Watch'}];
    round.submitGuess(player, 'watch');
    assert.equal(round.isFinished, true);
  });
});