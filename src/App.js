import './App.css';
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import {useEffect, useState} from "react";
import {showNotification as show} from './helpers/helpers';
import Popup from "./components/Popup";
import Notification from "./components/Notification";

const words = ['application', 'programming', 'interface', 'wizard', 'book', 'shit'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// let playable = true;
// const correctLetters = [];
// const wrongLetters = [];




function App() {

    const [playable, setPlayable] = useState(true)
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {

        const handleKeydown = event => {
            const {key, keyCode} = event;

                if (playable && keyCode >= 65 && keyCode <= 90) {
                    const letter = key.toLowerCase();

                    if (selectedWord.includes(letter)) {
                        if (!correctLetters.includes(letter)) {
                          setCorrectLetters(currentLetters => [...currentLetters, letter])

                           // displayWord();
                        } else {
                          show(setShowNotification);
                        }
                    } else {
                        if (!wrongLetters.includes(letter)) {
                            setWrongLetters(wrongLetters => [...wrongLetters, letter])

                        } else {
                           // showNotification();
                            show(setShowNotification);
                        }
                    }
                }
        }
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);

    }, [correctLetters, wrongLetters, playable])


    function playAgain() {
        setPlayable(true);

        // Empty arrays
        setCorrectLetters([]);
        setWrongLetters([]);
        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random]
    }

  return (
    <>
      <Header />
      <div className={'game-container'}>
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word
              selectedWord={selectedWord}
              correctLetters={correctLetters}
          />

      </div>
        <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />

    </>
  );
}

export default App;
