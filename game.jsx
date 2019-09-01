
import queenHeart from './img/heart/queenHeart.png';
import kingHeart from './img/heart/kingHeart.png';
import jokerHeart from './img/heart/jokerHeart.png';

import queenDiamond from './img/diamond/queenDiamond.png';
import kingDiamond from './img/diamond/kingDiamond.png';
import jokerDiamond from './img/diamond/jokerDiamond.png';

import queenSpade from './img/spade/queenSpade.png';
import kingSpade from './img/spade/kingSpade.png';
import jokerSpade from './img/spade/jokerSpade.png';

import queenClub from './img/club/queenClub.png';
import kingClub from './img/club/kingClub.png';
import jokerClub from './img/club/jokerClub.png';

import verso from './img/verso.png';
import versoNulo from './img/verso_nulo.png';
import walp from './img/wallpaper.png';


import './game.css';
import React, {useState} from 'react';
import Card from './Card/Card'
const {cards, naipes} = require ('../data');
export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      deck: [],
      playerOne: {
        score: 0,
        hand: [],
      },
      playerTwo: {
        score: 0,
        hand: [],
      },   
      limit: 21,
      game: false,
      burst: false,
      message: ''
    }
    this.gameStart = this.gameStart.bind(this);
    this.generateDeck = this.generateDeck.bind(this);
    this.getCard = this.getCard.bind(this);
    this.play = this.play.bind(this);
    this.burst = this.burst.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
    
  componentDidMount(){
  }
  async gameStart(card, naipe) {
    await this.generateDeck(card, naipe);
    await this.setState(state => ({
      game: state.game = true
    }));
  }

  generateDeck (card, naipe) {
    let beta = [];
    let gama = [];
    for(let i of card) {
      for (let j of naipe) {
        let card = {
          card: i.card,
          value: i.value,
          naipe: j.naipe,
          symbol: j.symbol,
          color: j.color
        };
        beta.push(card);
      }
    }  
    for (let i in beta) {
      let card = {
        id: i,
        ...beta[i]
      }
      gama.push(card);
    }
    this.setState(state => ({
      deck: state.deck.concat(gama),
    }))
  }
  getCard () {
    return this.state.deck.splice(Math.floor(Math.random()*this.state.deck.length), 1);
  }
  
  play (time) {
    if (!this.state.burst) {
      this.player();
      setTimeout(() => {
        this.IA();
      }, time);
      console.log(this.state.playerOne.score)
    }
  }

  burst () {
    if (this.state.playerOne.score > this.state.playerTwo.score || this.state.playerTwo.score > this.state.limit  ) {
      this.setState({ 
        burst: true,
        message: 'YOU WIN'
      });
    };

    if (this.state.playerOne.score < this.state.playerTwo.score || this.state.playerOne.score > this.state.limit ) {
      this.setState({ 
        burst: true,
        message: 'YOU LOSE'
      });
    };

  }

  player () {
    let card = this.getCard();
    let cardValue = card.map(item => item.value)
    let newDeck = this.state.deck.filter(item => item !== card);
    this.setState(state =>({
      deck: state.deck = newDeck,
      playerOne: {
        score: state.playerOne.score += Number(cardValue),
        hand: state.playerOne.hand.concat(card),
      }
    }));
  }

  IA () {
    let card = this.getCard();
    let cardValue = card.map(item => item.value)
    let newDeck = this.state.deck.filter(item => item !== card);
    this.setState(state =>({
      deck: state.deck = newDeck,
      playerTwo: {
        score: state.playerTwo.score += Number(cardValue),
        hand: state.playerTwo.hand.concat(card),
      }
    }));
  }

  handleChange(e) {
    this.setState({ limit: e.target.value });
  }

  render(){
    const styleCard = item => {
      return {
        color: (() => {
          switch (item.naipe) {
            case "Heart":   return "#bf1b54";
            case "Diamond": return "#3279e3";
            case "Spade":  return "#c73a3a";
            case "Club": return "#bf870d"
            default:      return "#FFFFFF";
          }
        })(),
        backgroundColor: (() => {
          if(item.card === 'J') return '#c0b6cc';
          if(item.card === 'Q') return '#c0adff';
          if(item.card === 'K') return '#e6ff40';
  
        })(),
        backgroundImage: (() => {
          if (item.card === 'Q' && item.naipe === 'Heart' ) return `url(${queenHeart})`;
          if (item.card === 'K' && item.naipe === 'Heart') return `url(${kingHeart})`;
          if (item.card === 'J' && item.naipe === 'Heart') return `url(${jokerHeart})`;
  
          if (item.card === 'Q' && item.naipe === 'Diamond') return `url(${queenDiamond})`
          if (item.card === 'K' && item.naipe === 'Diamond') return `url(${kingDiamond})`
          if (item.card === 'J' && item.naipe === 'Diamond') return `url(${jokerDiamond})`
  
          if (item.card === 'Q' && item.naipe === 'Spade') return `url(${queenSpade})`;
          if (item.card === 'K' && item.naipe === 'Spade') return `url(${kingSpade})`;
          if (item.card === 'J' && item.naipe === 'Spade') return `url(${jokerSpade})`;
  
          if (item.card === 'Q' && item.naipe === 'Club') return `url(${queenClub})`;
          if (item.card === 'K' && item.naipe === 'Club') return `url(${kingClub})`;
          if (item.card === 'J' && item.naipe === 'Club') return `url(${jokerClub})`;
        })(),
        backgroundSize: 'cover',
        }
    }
    return(
      <div id="game">
        <ul>
        {this.state.playerTwo.hand.map(item => (
          <li id="li_player2"key={item.id}>
            {(() => {
              if (this.state.game) {
                if (this.state.burst){
                  return (
                    <div className="card" style= {styleCard(item)}>
                      <div className="card-top">
                        <p className="card-value">{item.card}</p>
                        <p className="symbol">{item.symbol}</p>
                      </div>
                      <div className="card-bottom">
                        <p className="symbol">{item.symbol}</p>
                        <p>{item.card}</p>
                      </div>
                    </div>
                  )
                }
                return (
                  <img src={verso}/>
                )
              }
            })()}
          </li>
        ))}
        </ul>
        {(() => {
          if (!this.state.game) {
            return <Card onChange={this.handleChange}onClick={() => this.gameStart(cards, naipes)} title="Welcome" src={walp} btnName="START" placeholder="Limit"/>
            
          }
          return (
            <img onClick={() => this.play(342)} src={(() => {
              if (!this.state.deck.length || this.state.burst) return versoNulo;
              return verso;
            })()} alt="play"></img>
          )
        })()}
        <h1>{this.state.message}</h1>
        {(() => {
          if (this.state.game) {
            return (
              <ul>
              {this.state.playerOne.hand.map(item => (
                <li className="cardsPlayer" key={item.id}>
                  <div className="card" style={styleCard(item)}>
                    <div className="card-top">
                      <p className="card-value">{item.card}</p>
                      <p className="symbol">{item.symbol}</p>
                    </div>
                    <div className="card-bottom">
                      <p className="symbol">{item.symbol}</p>
                      <p>{item.card}</p>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            )
          }
        })()}
        {(() => {
          if(this.state.game && this.state.playerOne.hand.length > 0 && !this.state.burst) {
            return <button id="burst" onClick={this.burst}>BURST</button>
          };
        })()}
      </div>

    )
  }


}



