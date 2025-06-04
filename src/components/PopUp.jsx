import React from 'react';

const PopUp = ({ message, onClose ,newGame}) => {
  return (
    <div
      className="fixed inset-0  bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black p-6 rounded-xl shadow-md   w-90  h-56 text-center relative "
        onClick={(e) => e.stopPropagation()}
      >
       <div className="mb-4 text-lg font-bold text-white">
        {message}
       </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={onClose}
            className="bg-black p-6 font-bold text-white px-4 py-2  rounded-xl hover:bg-purple-800 w-34 h-12 border-2"
          >
            Close
          </button>
          <button
            onClick={newGame}
            className="bg-black p-6 font-bold text-white px-4 py-2 rounded-xl hover:bg-purple-800 w-34 h-12 border-2"
          >
            New Game
          </button>
        </div>
      
      </div>
    </div>
  );
};

export default PopUp;
