import React, { useEffect,useState } from 'react';
import Card from './components/Card';
import PopUp from './components/PopUp';

const cardImages=[
  {"src":"/img/img1.png",matched:false,peek:false},
  {"src":"/img/img2.png",matched:false,peek:false},
  {"src":"/img/img3.png",matched:false,peek:false},
  {"src":"/img/img4.png",matched:false,peek:false},
  {"src":"/img/img5.png",matched:false,peek:false},
  {"src":"/img/img6.png",matched:false,peek:false},
  {"src":"/img/img7.png",matched:false,peek:false},
  {"src":"/img/img8.png",matched:false,peek:false},
  {"src":"/img/img9.png",matched:false,peek:false},
  {"src":"/img/img10.png",matched:false,peek:false},
  {"src":"/img/img11.png",matched:false,peek:false},
  {"src":"/img/img12.png",matched:false,peek:false},
  {"src":"/img/img13.png",matched:false,peek:false},
  {"src":"/img/img14.png",matched:false,peek:false},
  {"src":"/img/img15.png",matched:false,peek:false},
  {"src":"/img/img16.png",matched:false,peek:false},
  {"src":"/img/img17.png",matched:false,peek:false},
  {"src":"/img/img18.png",matched:false,peek:false},
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
  const [peek, setPeek] = useState(false);
  const [peekLeft, setPeekLeft] = useState(1);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState('');
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
  setPeekLeft(1)

  }
  useEffect(() => {
      setCard(prev=>prev.map(card=>{
      return {...card,matched:true}
    
   }))   
   setTimeout(() => {
      setCard(prev=>prev.map(card=>{
      if(!card.peek){
      return {...card,matched:false}   
      }
      else{
        return card
      }
   })) 
   setPeek(false)
   }, 1000);
  }, [peek]);
  const handlePeek=()=>{
    if(peekLeft>0 && !peek){
      setPeek(true)
      setPeekLeft(0)
    }

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
            return {...card,matched:true,peek:true}
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
    const storedScore = localStorage.getItem('highScore');
    const previousScore = parseInt(storedScore);
    let isNewBest = false;

    if ((isNaN(previousScore) || currentScore < previousScore) && currentScore > 0) {
      localStorage.setItem('highScore', currentScore);
      setHighScore(currentScore);
      isNewBest = true;
    }
    const popupContent = (
  <div className="text-center space-y-3">
    {isNewBest ? (
      !isNaN(previousScore) ? (
        <>
          <h2 className="text-xl font-bold text-white">🥇 New Record!🥇 </h2>
          <p className="text-white">
            Fastest Time: <span className="font-semibold">{currentScore}s</span>
          </p>
          <p className="text-white font-semibold">
            You beat your old best of {previousScore}s! 
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white"> 🎉 First Record! 🎉</h2>
          <p className="text-white">
            First Score: <span className="font-semibold">{currentScore}s</span>
          </p>
          <p className="text-white font-semibold">
            Best time... *for now* 😏
          </p>
        </>
      )
    ) : (
      <>
        <h2 className="text-xl font-bold text-white">Game Over</h2>
        <p className="text-white">
          Your Time: <span className="font-semibold">{currentScore}s</span>
        </p>
        <p className="text-white font-semibold">
          Best Time: {previousScore}s — can you beat it?
        </p>
      </>
    )}
  </div>
);


    setPopUpMsg(popupContent);
    setShowPopUp(true);
    setGameOver(false);
  }
}, [gameOver]);
 return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <div className="lg:hidden w-full mb-4 flex flex-col items-center ">
        <h1 className="text-4xl font-bold mt-6 mb-3 text-[#3f185b]">Memory Game</h1>
        <div className="flex flex-row gap-4 mb-3">
          <button className="button" onClick={shuffleCards}>New Game</button>
          <button className="button" onClick={handlePeek} title="Quick peek once 😏">Peek</button>


        </div>
        <div className="text-xl text-gray-800 font-bold">
          🏆 Best Time: {highScore === 9999 ? '--:--' : `${String(Math.floor(highScore / 60)).padStart(2, '0')}:${String(highScore % 60).padStart(2, '0')}`}
        </div>
      </div>

      <div className="hidden lg:flex flex-col w-[300px] items-center bg-[#3f185b] rounded-r-md text-white">
        <h1 className="text-4xl mt-10 mb-15">Memory Game</h1>
        <button className="button" onClick={shuffleCards}>New Game</button>
        <p className="text-md mb-2 mt-8">Quick peek once 😏</p>
        <button className="button" onClick={handlePeek}>Peek</button>
        <p className="font-semibold text-2xl mt-10 ">
          🏆 Best Time: {highScore === 9999 ? '--:--' : `${String(Math.floor(highScore / 60)).padStart(2, '0')}:${String(highScore % 60).padStart(2, '0')}`}
        </p>
      </div>

      <p className="time hidden lg:flex">
        <img className="w-[32px] h-[30px] rounded-2xl bg-gray-700 mr-2" src="/img/stopwatch.png" alt="timer" />
        Time: {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
      </p>

      <div className="grid grid-cols-6 p-3 mx-1 my-1 sm:mx-1 sm:my-1 lg:mx-12 lg:my-6 gap-3 sm:gap-3 lg:gap-1 ">
        {card.map(c => (
          <Card
            key={c.id}
            handleChoice={handleChoice}
            card={c}
            flipped={c === choiceOne || c === choiceTwo || c.matched}
            disable={disable}
          />
        ))}
      </div>

      {showPopUp && (
        <PopUp message={popUpMsg} onClose={() => setShowPopUp(false)} newGame={() => { shuffleCards(); setShowPopUp(false); }} />
      )}
    </div>
  );
}

export default App
