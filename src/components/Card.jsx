import React from 'react'

const Card = ({card}) => {
  return (
          <div key={card.id}>
          <img  className='img' src={card.src} alt="card-front" />
          <img className='img'src="/src/assets/img/cover.jpg" alt="card-back" />
          </div>
  )
}

export default Card