import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet";

// Prize images
const prizeImages = {
  50: "/assets/prizes/bronze_medal.png",
  100: "/assets/prizes/silver_trophy.png",
  200: "/assets/prizes/gold_trophy.png",
  500: "/assets/prizes/diamond_chest.png"
};

// 100+ words per level
const words = {
  easy: [
    "cat","dog","bat","sun","hat","pen","cup","box","car","map","key","book","fish","milk","tree",
    "bird","moon","star","shoe","ball","desk","leaf","rain","kite","lamp","door","ring","wall","coin",
    "fan","egg","toy","cupcake","sock","flag","rope","bell","nest","cupboard","cupola","drum","fork",
    "spoon","knife","glass","tub","jar","pan","cap","gum","leaflet","net","baton","doorway","pencil",
    "river","brush","plate","clock","plant","shirt","garden","forest","market","window","animal","button",
    "mirror","carpet","ticket","street","candle","basket","camera","puzzle","jungle","rocket","grape",
    "bread","house","train","cloud","horse","light","music","fruit","flower","bridge","lamp","balloon",
    "orange","apple","water","stone","beach","brick","flagpole","drawer","staircase","backpack","notebook",
    "chalk","eraser","marker","crayon","letter","gardenia","butterfly"
  ],
  medium: [
    "apple","table","chair","train","house","green","light","phone","music","cloud","river","horse","bread",
    "clock","water","grape","flame","stone","beach","candy","brush","plant","shirt","paper","fruit","pencil",
    "flower","bridge","market","forest","window","garden","animal","button","pillow","mirror","carpet","ticket",
    "street","candle","basket","camera","puzzle","jungle","rocket","forest","castle","keyboard","butter","laptop",
    "garden","diamond","forest","window","puzzle","library","market","train","flower","orange","purple","yellow",
    "monkey","guitar","violin","painting","camera","bridge","street","candle","basket","keyboard","computer",
    "mountain","festival","river","desert","ocean","rocket","sunflower","planet","galaxy","keyboard","lamp",
    "mirror","book","clock","button","house","train","flower","pencil","phone","guitar","keyboard","bridge",
    "camera","window","forest","planet","garden","flower","keyboard","mirror","ticket","basket","painting","violin"
  ],
  hard: [
    "mystery","dynamic","complex","freedom","amazing","journey","fantasy","kingdom","elegant","victory",
    "library","diamond","picture","science","country","adventure","treasure","mountain","solution","computer",
    "discovery","calendar","elephant","butterfly","knowledge","education","strategy","universe","volcano",
    "horizon","instrument","literature","symphony","philosophy","microscope","revolution","tournament",
    "festival","chocolate","experiment","galaxy","inspiration","civilization","architecture","innovation",
    "technology","celebration","electricity","algorithm","republic","architecture","symphony","philosophy",
    "microscope","revolution","tournament","experiment","galaxy","inspiration","civilization","algorithm",
    "technology","celebration","electricity","innovation","republic","kingdom","fantasy","journey","victory",
    "discovery","adventure","mountain","solution","computer","picture","diamond","library","strategy","knowledge",
    "philosophy","galaxy","innovation","celebration","mystery","universe","dynamic","technology","algorithm",
    "freedom","complex","journey","fantasy","kingdom","elegant","victory","library","diamond","picture"
  ]
};

export default function App() {
  const [level, setLevel] = useState("easy");
  const [currentWord, setCurrentWord] = useState("");
  const [jumbledWord, setJumbledWord] = useState("");
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [prizeInfo, setPrizeInfo] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef(null);

  // Ad placeholder
  useEffect(() => {
    // TODO: Add ad code snippet here
  }, []);

  // Analytics placeholder
  useEffect(() => {
    // TODO: Add Google Analytics tracking code here
  }, []);

  useEffect(() => { generateWord(level); }, [level]);

  useEffect(() => {
    if (timeLeft === 0) { handleTimeUp(); return; }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const jumbleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

  const generateWord = (lvl) => {
    const wordList = words[lvl];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    setJumbledWord(jumbleWord(randomWord));
    setInput("");
    setTimeLeft(20);
  };

  const handleSubmit = () => {
    if (input.toLowerCase() === currentWord.toLowerCase()) {
      const newCoins = coins + 10;
      setCoins(newCoins);
      setMessage("✅ Correct!");
      const prizeThreshold = Object.keys(prizeImages).map(Number).reverse().find(thresh => newCoins >= thresh);
      if (prizeThreshold) {
        setPrizeInfo({ image: prizeImages[prizeThreshold], text: `🎉 You've reached ${prizeThreshold} coins!` });
        setShowConfetti(true);
        setTimeout(() => { setPrizeInfo(null); setShowConfetti(false); }, 2000);
      } else {
        setPrizeInfo({ text: `🎁 You've earned 10 coins! Keep going!` });
        setTimeout(() => setPrizeInfo(null), 1500);
      }
      setTimeout(() => { setMessage(""); generateWord(level); }, 1500);
    } else {
      setMessage("❌ Try Again!");
    }
  };

  const handleTimeUp = () => {
    setMessage("⏰ Time's Up!");
    setTimeout(() => { setMessage(""); generateWord(level); }, 1500);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };
  const resetGame = () => { setCoins(0); generateWord(level); };

  return (
    <>
      <Helmet>
        <title>Jumbled Word Game - Fun Word Puzzle Challenge</title>
        <meta name="description" content="Play the Jumbled Word Game online! Solve jumbled words across easy, medium, and hard levels. Earn coins and prizes while improving your vocabulary." />
        <meta name="keywords" content="Jumbled Word Game, Word Puzzle, Online Game, Vocabulary Game, Fun Word Game, Brain Game, Easy Word Game, Medium Word Game, Hard Word Game, Coin Rewards, Prize Game" />
        <meta property="og:title" content="Jumbled Word Game - Fun Word Puzzle Challenge" />
        <meta property="og:description" content="Solve jumbled words online, earn coins, and win exciting prizes!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/prizes/diamond_chest.png" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center p-4">
        {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
        <h1 className="text-4xl font-bold mb-2">🎲 Jumbled Word Game</h1>
        <div className="text-lg mb-4">Current Level: <span className="font-semibold">{level.charAt(0).toUpperCase() + level.slice(1)}</span></div>
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 bg-green-400 rounded-2xl" onClick={() => setLevel("easy")}>Easy</button>
          <button className="px-4 py-2 bg-yellow-400 rounded-2xl" onClick={() => setLevel("medium")}>Medium</button>
          <button className="px-4 py-2 bg-red-400 rounded-2xl" onClick={() => setLevel("hard")}>Hard</button>
        </div>
        <div className="text-lg font-semibold mb-2">⏳ Time Left: {timeLeft}s</div>
        <div className="text-xl mb-4">💰 Coins: {coins}</div>
        <div className="bg-white p-4 rounded-2xl shadow-md text-2xl mb-4">{jumbledWord}</div>
        <input ref={inputRef} className="border p-2 rounded-2xl mb-4 w-full max-w-xs text-center" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your answer" />
        <div className="flex gap-4 mb-4">
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-2xl">Submit</button>
          <button onClick={resetGame} className="px-6 py-2 bg-gray-400 text-white rounded-2xl">Reset</button>
        </div>
        <AnimatePresence>
          {message && <motion.div key={message} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="mt-4 text-2xl font-bold">{message}</motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {prizeInfo && <motion.div key={prizeInfo.text} initial={{opacity:0, y:50}} animate={{opacity:1, y:0, scale:1.1}} exit={{opacity:0, y:50}} className="mt-4 flex flex-col items-center">{prizeInfo.image && <img src={prizeInfo.image} alt="prize" className="w-20 h-20 mb-2" />}{prizeInfo.text && <div className="text-lg text-green-700 font-semibold">{prizeInfo.text}</div>}</motion.div>}
        </AnimatePresence>
      </div>
    </>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet";

// Prize images
const prizeImages = {
  50: "/assets/prizes/bronze_medal.png",
  100: "/assets/prizes/silver_trophy.png",
  200: "/assets/prizes/gold_trophy.png",
  500: "/assets/prizes/diamond_chest.png"
};

// 100+ words per level
const words = {
  easy: [
    "cat","dog","bat","sun","hat","pen","cup","box","car","map","key","book","fish","milk","tree",
    "bird","moon","star","shoe","ball","desk","leaf","rain","kite","lamp","door","ring","wall","coin",
    "fan","egg","toy","cupcake","sock","flag","rope","bell","nest","cupboard","cupola","drum","fork",
    "spoon","knife","glass","tub","jar","pan","cap","gum","leaflet","net","baton","doorway","pencil",
    "river","brush","plate","clock","plant","shirt","garden","forest","market","window","animal","button",
    "mirror","carpet","ticket","street","candle","basket","camera","puzzle","jungle","rocket","grape",
    "bread","house","train","cloud","horse","light","music","fruit","flower","bridge","lamp","balloon",
    "orange","apple","water","stone","beach","brick","flagpole","drawer","staircase","backpack","notebook",
    "chalk","eraser","marker","crayon","letter","gardenia","butterfly"
  ],
  medium: [
    "apple","table","chair","train","house","green","light","phone","music","cloud","river","horse","bread",
    "clock","water","grape","flame","stone","beach","candy","brush","plant","shirt","paper","fruit","pencil",
    "flower","bridge","market","forest","window","garden","animal","button","pillow","mirror","carpet","ticket",
    "street","candle","basket","camera","puzzle","jungle","rocket","forest","castle","keyboard","butter","laptop",
    "garden","diamond","forest","window","puzzle","library","market","train","flower","orange","purple","yellow",
    "monkey","guitar","violin","painting","camera","bridge","street","candle","basket","keyboard","computer",
    "mountain","festival","river","desert","ocean","rocket","sunflower","planet","galaxy","keyboard","lamp",
    "mirror","book","clock","button","house","train","flower","pencil","phone","guitar","keyboard","bridge",
    "camera","window","forest","planet","garden","flower","keyboard","mirror","ticket","basket","painting","violin"
  ],
  hard: [
    "mystery","dynamic","complex","freedom","amazing","journey","fantasy","kingdom","elegant","victory",
    "library","diamond","picture","science","country","adventure","treasure","mountain","solution","computer",
    "discovery","calendar","elephant","butterfly","knowledge","education","strategy","universe","volcano",
    "horizon","instrument","literature","symphony","philosophy","microscope","revolution","tournament",
    "festival","chocolate","experiment","galaxy","inspiration","civilization","architecture","innovation",
    "technology","celebration","electricity","algorithm","republic","architecture","symphony","philosophy",
    "microscope","revolution","tournament","experiment","galaxy","inspiration","civilization","algorithm",
    "technology","celebration","electricity","innovation","republic","kingdom","fantasy","journey","victory",
    "discovery","adventure","mountain","solution","computer","picture","diamond","library","strategy","knowledge",
    "philosophy","galaxy","innovation","celebration","mystery","universe","dynamic","technology","algorithm",
    "freedom","complex","journey","fantasy","kingdom","elegant","victory","library","diamond","picture"
  ]
};

export default function App() {
  const [level, setLevel] = useState("easy");
  const [currentWord, setCurrentWord] = useState("");
  const [jumbledWord, setJumbledWord] = useState("");
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [prizeInfo, setPrizeInfo] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef(null);

  // Ad placeholder
  useEffect(() => {
    // TODO: Add ad code snippet here
  }, []);

  // Analytics placeholder
  useEffect(() => {
    // TODO: Add Google Analytics tracking code here
  }, []);

  useEffect(() => { generateWord(level); }, [level]);

  useEffect(() => {
    if (timeLeft === 0) { handleTimeUp(); return; }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const jumbleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

  const generateWord = (lvl) => {
    const wordList = words[lvl];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    setJumbledWord(jumbleWord(randomWord));
    setInput("");
    setTimeLeft(20);
  };

  const handleSubmit = () => {
    if (input.toLowerCase() === currentWord.toLowerCase()) {
      const newCoins = coins + 10;
      setCoins(newCoins);
      setMessage("✅ Correct!");
      const prizeThreshold = Object.keys(prizeImages).map(Number).reverse().find(thresh => newCoins >= thresh);
      if (prizeThreshold) {
        setPrizeInfo({ image: prizeImages[prizeThreshold], text: `🎉 You've reached ${prizeThreshold} coins!` });
        setShowConfetti(true);
        setTimeout(() => { setPrizeInfo(null); setShowConfetti(false); }, 2000);
      } else {
        setPrizeInfo({ text: `🎁 You've earned 10 coins! Keep going!` });
        setTimeout(() => setPrizeInfo(null), 1500);
      }
      setTimeout(() => { setMessage(""); generateWord(level); }, 1500);
    } else {
      setMessage("❌ Try Again!");
    }
  };

  const handleTimeUp = () => {
    setMessage("⏰ Time's Up!");
    setTimeout(() => { setMessage(""); generateWord(level); }, 1500);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };
  const resetGame = () => { setCoins(0); generateWord(level); };

  return (
    <>
      <Helmet>
        <title>Jumbled Word Game - Fun Word Puzzle Challenge</title>
        <meta name="description" content="Play the Jumbled Word Game online! Solve jumbled words across easy, medium, and hard levels. Earn coins and prizes while improving your vocabulary." />
        <meta name="keywords" content="Jumbled Word Game, Word Puzzle, Online Game, Vocabulary Game, Fun Word Game, Brain Game, Easy Word Game, Medium Word Game, Hard Word Game, Coin Rewards, Prize Game" />
        <meta property="og:title" content="Jumbled Word Game - Fun Word Puzzle Challenge" />
        <meta property="og:description" content="Solve jumbled words online, earn coins, and win exciting prizes!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/prizes/diamond_chest.png" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center p-4">
        {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
        <h1 className="text-4xl font-bold mb-2">🎲 Jumbled Word Game</h1>
        <div className="text-lg mb-4">Current Level: <span className="font-semibold">{level.charAt(0).toUpperCase() + level.slice(1)}</span></div>
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 bg-green-400 rounded-2xl" onClick={() => setLevel("easy")}>Easy</button>
          <button className="px-4 py-2 bg-yellow-400 rounded-2xl" onClick={() => setLevel("medium")}>Medium</button>
          <button className="px-4 py-2 bg-red-400 rounded-2xl" onClick={() => setLevel("hard")}>Hard</button>
        </div>
        <div className="text-lg font-semibold mb-2">⏳ Time Left: {timeLeft}s</div>
        <div className="text-xl mb-4">💰 Coins: {coins}</div>
        <div className="bg-white p-4 rounded-2xl shadow-md text-2xl mb-4">{jumbledWord}</div>
        <input ref={inputRef} className="border p-2 rounded-2xl mb-4 w-full max-w-xs text-center" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your answer" />
        <div className="flex gap-4 mb-4">
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-2xl">Submit</button>
          <button onClick={resetGame} className="px-6 py-2 bg-gray-400 text-white rounded-2xl">Reset</button>
        </div>
        <AnimatePresence>
          {message && <motion.div key={message} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="mt-4 text-2xl font-bold">{message}</motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {prizeInfo && <motion.div key={prizeInfo.text} initial={{opacity:0, y:50}} animate={{opacity:1, y:0, scale:1.1}} exit={{opacity:0, y:50}} className="mt-4 flex flex-col items-center">{prizeInfo.image && <img src={prizeInfo.image} alt="prize" className="w-20 h-20 mb-2" />}{prizeInfo.text && <div className="text-lg text-green-700 font-semibold">{prizeInfo.text}</div>}</motion.div>}
        </AnimatePresence>
      </div>
    </>
  );
}
