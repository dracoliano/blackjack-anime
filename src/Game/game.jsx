import verso from './img/verso.png';
import versoNulo from './img/verso_nulo.png';
import walp from './img/wallpaper.png';

import './game.css';
import React, {useState} from 'react';
import Card from './Card/Card';
import Test from './test';
const {cards, naipes} = require ('../data');

const Game = (props) => {
  const [game, setGame]           = useState(false);
  const [deck, setDeck]           = useState([]);
  const [playerOne, setPlayerOne] = useState({hand: [], score: 0});
  const [playerTwo, setPlayerTwo] = useState({hand: [], score: 0});
  const [limit, setLimit]         = useState(21);
  const [burst, setBurst]         = useState(false);
  const [message, setMessage]     = useState('');

  useEffect(() => {
    document.title = `Your score is : ${playerOne.s}` 
  });


  const generateDeck = (card, naipe) => {
    let genDeck = [];
    for(let i of card) {
      for (let j of naipe) {
        let card = {...i,...j};
        genDeck.push(card);
      }
    }  
    for (let i in genDeck) {
      let card = {...genDeck[i], id: i}
      setDeck(deck => deck.concat(card));
    }
  }
  const gameStart = (card, naipe) => {
    setGame(game => true)
    generateDeck(card, naipe);
  }
  const getCard = () => deck.splice(Math.floor(Math.random()*deck.length), 1);

  const play = time => {
    let cardP1 = getCard();
    let cardP2;
    setPlayerOne({hand: playerOne.hand.concat(cardP1), score: playerOne.score+cardP1.map(item => item.value)});
    setTimeout(() => {
      cardP2 = getCard();
      setPlayerTwo({hand: playerTwo.hand.concat(cardP2), score: playerTwo.score+cardP2.map(item => item.value)});
    }, time);
    console.log(deck)

  }
  const burstf = () =>  {
    if (playerOne.score > playerTwo.score || playerTwo.score > limit  ) {
      setBurst(burst => true);
      setMessage(message => 'YOU WIN');
    };
    if (playerOne.score < playerTwo.score || playerOne.score > limit ) {
      setBurst(burst => true);
      setMessage(message => 'YOU LOSE');
    };
  }
    return(
      <div id="game">
        {(() => {
          if (game) {
            if (burst) {
              return <Test hand={playerTwo.hand}/>
            }
            return <ul>{playerTwo.hand.map(item => (<li key={item.id}><img src={verso} alt="ia"/></li>))}</ul>
          }
        })()}
        {(() => {
          if (!game) {
            return <Card onClick={() => gameStart(cards, naipes)} title="Welcome" src={walp} btnName="START" placeholder="Limit"/>
          }
          return (
            <img onClick={() => play(342)} src={(() => {
              if (!deck.length || burst) return versoNulo;
              return verso;
            })()} alt="play"></img>
          )
        })()}
        <h1>{message}</h1>
        {(() => {
          if (game) {
            return (
              <Test hand={playerOne.hand}/>
            )
          }
        })()}
        {(() => {
          if(game && playerOne.hand.length && !burst) {
            return <button id="burst" onClick={() => burstf()}>BURST</button>
          };
        })()}
      </div>
    )
  }
export default Game;