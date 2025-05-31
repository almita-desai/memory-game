import React, { useEffect,useState } from 'react';
import Card from './components/Card';

const cardImages=[
  {"src":"/src/assets/img/img1.png",matched:false},
  {"src":"/src/assets/img/img2.png",matched:false},
  {"src":"/src/assets/img/img3.png",matched:false},
  {"src":"/src/assets/img/img4.png",matched:false},
  {"src":"/src/assets/img/img5.png",matched:false},
  {"src":"/src/assets/img/img6.png",matched:false},
  {"src":"/src/assets/img/img7.png",matched:false},
  {"src":"/src/assets/img/img8.png",matched:false},
  {"src":"/src/assets/img/img9.png",matched:false},
  {"src":"/src/assets/img/img10.png",matched:false},
  {"src":"/src/assets/img/img11.png",matched:false},
  {"src":"/src/assets/img/img12.png",matched:false},
  {"src":"/src/assets/img/img13.png",matched:false},
  {"src":"/src/assets/img/img14.png",matched:false},
  {"src":"/src/assets/img/img15.png",matched:false},
]

function App(){
  const [card, setCard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const shuffleCards=()=>{
  const shuffledCards=[...cardImages,...cardImages]
  .sort(()=>Math.random()-0.5)
  .map((card)=>({...card,id:Math.random()}))
  setCard(shuffledCards)
  setTurn(0)
  setIsActive(true)
  setTimer(0)
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
    setDisable(true)
    if(choiceOne.src=== choiceTwo.src){
      setCard(prevCard=>{
        return prevCard.map(card=>{
          if(card.src===choiceTwo.src){
            return {...card,matched:true}
          }
          else{
            return card
          } })
        })
        resetCard()
      }
    
    else{
      setTimeout(() => {
        resetCard()
      }, 1000);

    }
  }
 }, [choiceTwo]);

 console.log(card)

 const resetCard=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurn(turn+1)
  setDisable(false)
 }
 useEffect(() => {
  shuffleCards();
}, []);
 
useEffect(() => {
  let interval
  if(isActive){
    interval=setInterval(() => {
      setTimer((prev)=>prev+1)
    }, 1000);
  }
  return () => clearInterval(interval)
}, [isActive]);

useEffect(() => {
  if(card.every(card=> card.matched)){
    setIsActive(false)
  }
  
}, [card]);

  return(
    <>
    <div className='flex flex-row justify-start h-screen'>
      <div className='flex flex-col left-0 w-[360px] items-center rounded-r-md' style={{ backgroundColor: "#3f185b" }}>
      <h1 className='text-4xl m-7'>Memory Game</h1>
      <button onClick={shuffleCards} className='button'> 
      Start
      </button>
      <p className='text-2xl font-bold m-7'>Turns : {turn}</p>
      <p className="font-semibold text-lg m-7">Time: {String(Math.floor(timer / 60)).padStart(2, '0')}:
        {String(timer % 60).padStart(2, '0')}
      </p>          
      </div>
    
    <div className='grid grid-cols-6 gap-0 p-7 mx-54 my-10'>
  
       {
        card.map(card=>(
          <Card key={card.id} 
          handleChoice={handleChoice}
          card={card}
          flipped={card===choiceOne|| card===choiceTwo|| card.matched}
          disable={disable}
          >
          </Card>
        )) 
       }
    </div>
    </div>

    
    </>
  )
}

export default App
