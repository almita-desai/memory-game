import React from 'react'

const Card = ({card,handleChoice}) => {
    const handleCard=()=>{
        handleChoice(card)
    }
  return (
          <div key={card.id}>
          <img  className='img' src={card.src} alt="card-front" />
          <img className='img'
          src="/src/assets/img/cover.jpg" 
          onClick={handleCard}
          alt="card-back" />
          </div>
  )
}

export default Card