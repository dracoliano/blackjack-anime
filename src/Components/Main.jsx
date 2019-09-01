import verso from './Images/verso.png';
import walp from './Images/wallpaper.png';

import push from '../Music/push.wav';
import music from '../Music/music.mp3';

import './main.css';

import React, {useState, useEffect} from 'react';

import Menu from './Menu/Menu';
import Card from './Card/Card';

const {cards, naipes} = require ('../data');

const Main = () => {
  const [game, setGame]           = useState(false);
  const [deck, setDeck]           = useState([]);
  const [playerOne, setPlayerOne] = useState({hand: [], score: 0});
  const [playerTwo, setPlayerTwo] = useState({hand: [], score: 0});
  const [limit]                   = useState(21);
  const [burst, setBurst]         = useState(false);
  const [message, setMessage]     = useState('');

  useEffect(() => {
    if (playerOne.score > limit) {
      setMessage(message => `You Lose. Score: ${playerOne.score}`)
      setBurst(burst => true);
    }
    if (playerTwo.score > limit) {
      setMessage(message => `You Win. Oponent Score: ${playerTwo.score}`)
      setBurst(burst => true);
    };    
    if (playerTwo.score >= limit-3 && playerTwo.score <= limit) {
      if(playerOne.score === playerTwo.score) {
        setMessage(message => `DRAW`)
      }
      if(playerOne.score > playerTwo.score) {
        setMessage(message => `OPONENT BURST, You Win. Score: ${playerOne.score}`)
      }
      if (playerTwo.score > playerOne.score) {
        setMessage(message => `OPONENT BURST, You Lose. Oponent Score: ${playerTwo.score}`)
      };    
      setBurst(burst => true);

    }
  }, [playerOne.score, limit, playerTwo.score, playerOne, playerTwo]);


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
    let music = document.querySelector('#music')
    music.play();
    music.volume = 0.3;

  }
  
  const restart = () => {
    setGame(false);
    setDeck([])
    setBurst(false);
    setMessage('');
    setPlayerOne({hand: [], score: 0});
    setPlayerTwo({hand: [], score: 0});
    let music = document.querySelector('#music')
    music.pause()
    music.currentTime = 0;
  }

  const getCard = deck => deck.splice(Math.floor(Math.random()*deck.length), 1);

  const play = (deck, time) => {
    if(!burst) {
      setTimeout(() => {
        let cardP1 = getCard(deck)
        let cardP2 = getCard(deck)
        setPlayerOne({hand: playerOne.hand.concat(cardP1), score: playerOne.score+Number(cardP1.map(item => item.value))});
        setPlayerTwo({hand: playerTwo.hand.concat(cardP2), score: playerTwo.score+Number(cardP2.map(item => item.value))});
      }, time);
      document.querySelector('#push').play();
    }
  }
  const burstf = () =>  {
    if (playerOne.score > playerTwo.score) {
      setBurst(burst => true);
      setMessage(message => 'YOU WIN');
    };
    if (playerOne.score < playerTwo.score) {
      setBurst(burst => true);
      setMessage(message => 'YOU LOSE');
    };
    if (playerOne.score === playerTwo.score) {
      setBurst(burst => true);
      setMessage(message => 'DRAW');
    }
  }

    return(
      <>
      {(() => {
          if (!game) {
            return <Menu onClick={() => gameStart(cards, naipes)} title="Welcome" src={walp} btnName="START" placeholder="Limit"/>
          }
          return (
            <>
              <audio id="push" src={push}></audio>
              <img onClick={() => play(deck,120)} src={verso} id="push"alt="play" style={{
              filter: (() => {
                  if (!deck.length || burst) return 'grayscale(100%)';;
              })()
            }}></img>
            </>
            
          )
        })()}
        {(() => {
          if (game) {
            return (
              <>
                <span id="message">{message}</span>
                <Card hand={playerOne.hand}/>
              </>
            )
          }
        })()}
        <div id="game">
          <audio id="music" src={music} autoplay loop></audio>
        {(() => {
          if(playerOne.hand.length > 1 && !burst) {
            return <button id="burst" onClick={() => burstf()}>BURST</button>
          };
        })()}
        {(() => {
          if (game) {
            if (burst) {
              return (
              <>
                <Card id="player2"hand={playerTwo.hand}/>
                <button id="restart" onClick={() => restart() }>Restart</button>
              </>
              )
            }
            return <ul>{playerTwo.hand.map(item => (<li key={item.id}><img src={verso} alt="ia"/></li>))}</ul>
          }
        })()}
      </div>
      </>
    )
  }
export default Main;