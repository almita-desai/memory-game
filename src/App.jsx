import React, { useDeferredValue, useRef, useState } from 'react';

const cardImages=[
  {"src":"/src/assets/img/img0.png"},
  {"src":"/src/assets/img/img1.png"},
  {"src":"/src/assets/img/img2.png"},
  {"src":"/src/assets/img/img3.png"},
  {"src":"/src/assets/img/img4.png"},
  {"src":"/src/assets/img/img5.png"},
  {"src":"/src/assets/img/img6.png"},
  {"src":"/src/assets/img/img7.png"},
  {"src":"/src/assets/img/img8.png"},
  {"src":"/src/assets/img/img9.png"}
]

function App(){
  const [card, setCard] = useState([]);
  const [turn, setTurn] = useState(0);

  const shuffleCards=()=>{
  const shuffledCards=[...cardImages,...cardImages]
  .sort(()=>Math.random()-0.5)
  .map((card)=>({...card,id:Math.random()}))
  setCard(shuffledCards)
  setTurn(turn+1)
  }
  console.log(card,turn)
  return(
    <>
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-2xl m-4 '>Memory Game</h1>
      <button onClick={shuffleCards} className='button'> 
        New Game
      </button>
    </div>
    </>
  )
}

export default App
