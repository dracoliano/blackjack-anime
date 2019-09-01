import queenHeart from '../Images/heart/queenHeart.png';
import kingHeart from '../Images/heart/kingHeart.png';
import jokerHeart from '../Images/heart/jokerHeart.png';

import queenDiamond from '../Images/diamond/queenDiamond.png';
import kingDiamond from '../Images/diamond/kingDiamond.png';
import jokerDiamond from '../Images/diamond/jokerDiamond.png';

import queenSpade from '../Images/spade/queenSpade.png';
import kingSpade from '../Images/spade/kingSpade.png';
import jokerSpade from '../Images/spade/jokerSpade.png';

import queenClub from '../Images/club/queenClub.png';
import kingClub from '../Images/club/kingClub.png';
import jokerClub from '../Images/club/jokerClub.png';

import './card.css'

import React from 'react';

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

const Test = props => {
  return (
    <ul>
      {props.hand.map(item => (
      <li key={item.id}>
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

export default Test