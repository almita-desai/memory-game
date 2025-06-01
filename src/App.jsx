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
  const [highScore, setHighScore] = useState(() => {
  const stored = parseInt(localStorage.getItem('highScore'));
  return !isNaN(stored) && stored > 0 ? stored : 9999;
});

  const [gameOver, setGameOver] = useState(false);

  const shuffleCards=()=>{
  const shuffledCards=[...cardImages,...cardImages]
  .sort(()=>Math.random()-0.5)
  .map((card)=>({...card,id:Math.random()}))
  setCard(shuffledCards)
  setTurn(0)
  setTimer(0)
  setIsActive(false)
  setChoiceOne(null);
  setChoiceTwo(null);
  setGameOver(false);

  }
  const handleChoice=(card)=>{
  if (!isActive && timer === 0) {
    setIsActive(true);

  }
    if (choiceOne==null){
      setChoiceOne(card)

    }
    else{
      setChoiceTwo(card)
    }
  }
  
  useEffect(() => {
  if(choiceOne && choiceTwo){
    setDisable(true)
    if(choiceOne.src=== choiceTwo.src){
      setCard(prevCard=>{
        const updatedCards = prevCard.map(card => {
          if(card.src===choiceTwo.src){
            return {...card,matched:true}
          }
          else{
            return card
          } })
        const allMatched = updatedCards.every(card => card.matched);
        if (allMatched) {
          setIsActive(false);
          setGameOver(true);
        }

        return updatedCards;
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
  if (gameOver) {
    const currentScore = timer;
    const storedScore = parseInt(localStorage.getItem('highScore'));

    if ((isNaN(storedScore) || currentScore < storedScore) && currentScore > 0) {
      localStorage.setItem('highScore', currentScore);
      setHighScore(currentScore);
    }

    setGameOver(false);
  }
}, [gameOver]);

  return(
    <>
    <div className='flex flex-row justify-start h-screen'>
      <div className='flex flex-col left-0 w-[360px] items-center rounded-r-md' style={{ backgroundColor: "#3f185b" }}>
      <h1 className='text-4xl m-7'>Memory Game</h1>
      <button onClick={shuffleCards} className='button'> 
      New Game 
      </button>
      <p className="text-2xl font-bold mt-9">Timer: {String(Math.floor(timer / 60)).padStart(2, '0')}:
        {String(timer % 60).padStart(2, '0')}
      </p>
      {/* <p className='font-semibold text-xl m-4'>Turns : {turn}</p> */}
      <p className="font-bold text-xl m-6">
        🏆 Best Time: {highScore === 9999 ? '--:--' : 
        `${String(Math.floor(highScore / 60)).padStart(2, '0')}:${String(highScore % 60).padStart(2, '0')}`}
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
