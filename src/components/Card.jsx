import React from 'react'

const Card = ({card,handleChoice,flipped,disable}) => {
    const handleCard=()=>{
      if(!disable){
        handleChoice(card)
      }
    }
  return (
          <div key={card.id} className={`card ${flipped ? "flipped" :" "}`}>
          <img  className='card-front' src={card.src} alt="card-front" />
          <img className='card-back'
          src="/img/cover.jpg" 
          onClick={handleCard}
          alt="card-back" />

          </div>
  )
}

export default Card