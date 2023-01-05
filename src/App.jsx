import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Intro from "../components/intro";
import Dice from "../components/dice";
import Debug from "../components/debug";

function App() {
  //All Dice values in State
  const [theDice, setTheDice] = useState(createDice());
  //Win State
  const [hasWon, setHasWon] = useState(false);
  //Count number of re-rolls
  const [counter, setCounter] = useState(0);
  //Dice Elements to Render on Page
  const diceElements = theDice.map((dice) => {
    return (
      <Dice
        key={dice.id}
        value={dice.value}
        keep={dice.keep}
        handleKeep={() => handleKeep(dice.id)}
      />
    );
  });
  //Game Win Check
  useEffect(() => {
    const dieValue = theDice[0].value;
    const checkDice = theDice.every((die) => die.value === dieValue);
    checkDice && setHasWon(true);
  }, [theDice]);

  // Get a random Dice value
  function randomValue() {
    const random = Math.floor(Math.random() * 6) + 1;
    return random;
  }

  // Initial Creation of 10 Dice
  function createDice() {
    const allDice = [];
    for (let i = 0; i < 10; i++) {
      allDice.push({
        id: nanoid(),
        value: randomValue(),
        keep: false,
      });
    }
    return allDice;
  }

  function handleKeep(id) {
    setTheDice((prevDice) => {
      return prevDice.map((dice) => {
        return id === dice.id
          ? {
              ...dice,
              keep: !dice.keep,
            }
          : dice;
      });
    });
  }

  function handleRoll() {
    setTheDice((prevDice) => {
      return prevDice.map((dice) => {
        return dice.keep === false ? { ...dice, value: randomValue() } : dice;
      });
    });
    //Update Counter
    setCounter((prevCount) => (prevCount += 1));
    //Reset Dice
    hasWon && setTheDice(createDice());
    //Reset Win (hasWon)
    hasWon && setHasWon(false);
    //Rest Counter
    hasWon && setCounter(0);
  }
  function autoWin() {
    const winningDice = [];
    for (let i = 0; i < 10; i++) {
      winningDice.push({ id: nanoid(), value: 6, keep: true });
    }
    setTheDice(winningDice);
  }
  return (
    <>
      <div className="game">
        <Intro />
        {/* Dice Components */}
        <div className="dice-container">{diceElements}</div>
        {/* Roll Button */}
        <button className="dice-button" onClick={handleRoll}>
          {hasWon ? "Reset Game" : "Roll"}
        </button>
        <div className="dice-counter">Number of Rolls: {counter}</div>
        <Debug handleClick={autoWin} />
      </div>
      {hasWon ? <Confetti /> : ""}
    </>
  );
}

export default App;
