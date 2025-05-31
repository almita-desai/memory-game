import React, { useEffect,useState } from 'react';
import Card from './components/Card';

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
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards=()=>{
  const shuffledCards=[...cardImages,...cardImages]
  .sort(()=>Math.random()-0.5)
  .map((card)=>({...card,id:Math.random()}))
  setCard(shuffledCards)
  setTurn(0)
  }
  const handleChoice=(card)=>{
    if (choiceOne==null){
      setChoiceOne(card)

    }
    else{
      setChoiceTwo(card)
    }
  }
  console.log(choiceOne,choiceTwo)
  useEffect(() => {
  if(choiceOne && choiceTwo){
    if(choiceOne.src=== choiceTwo.src){
      console.log('match')
      resetCard()
    }
    else{
      console.log('not match')
      resetCard()
    }
  }
 }, [choiceOne,choiceTwo]);

 const resetCard=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurn(turn+1)
 }
  return(
    <>
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-2xl m-4 '>Memory Game</h1>
      <button onClick={shuffleCards} className='button'> 
        New Game
      </button>
    <div className='grid grid-cols-4 gap-8'>
       {
        card.map(card=>(
          <Card key={card.id} 
          handleChoice={handleChoice}
          card={card}>

          </Card>
        )) 
       }
    </div>

    </div>
    </>
  )
}

export default App
