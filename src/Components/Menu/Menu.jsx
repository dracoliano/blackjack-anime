import React from 'react';
import './menu.css';

const Card = props => {
  return (
    <>
      <div className="card-body">
        <div className="card-title">{props.title}</div>
        <img className="card-img" src={props.src} alt="walp"/>
      </div>
      <div className="card-footer">
        <button onClick={props.onClick}className="btn-card">{props.btnName}</button>
      </div>
    </>
  )
}

export default Card;