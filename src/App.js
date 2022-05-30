import { useState, useEffect } from 'react'

import Header from './components/Header'
import Button from './components/Button'
import Alert from './components/Alert'
import GameWord from './components/GameWord'
import GuessLetter from './components/GuessLetter'

const App = () => {
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [guesses, setGuesses] = useState(10)
  const [word, setWord] = useState('')
  const [gameLetters, setGameLetters] = useState([])
  const [displayLetters, setDisplayLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showGuessLetter, setShowGuessLetter] = useState(true)
  const [showUserWon, setShowUserWon] = useState(false)
  const [showUserLoss, setShowUserLoss] = useState(false)
  const [showAlreadyGuessed, setShowAlreadyGuessed] = useState(false)

  useEffect(() => {
    const getWord = async () => {
      const wordFromServer = await fetchWord()
      setWord(wordFromServer)
    }

    const getGuesses = async () => {
      // await resetGuesses()
      const guessesFromServer = await fetchGuesses()
      setGuesses(guessesFromServer)
    }

    const getWins = async () => {
      const winsFromServer = await fetchWins()
      setWins(winsFromServer)
    }

    const getLosses = async () => {
      const lossesFromServer = await fetchLosses()
      setLosses(lossesFromServer)
    }

    const getGameLetters = async () => {
      const gameLettersFromServer = await fetchGameLetters()
      setGameLetters(gameLettersFromServer)
    }

    // getWord()
    getGuesses()
    getWins()
    getLosses()
    // getGameLetters()
  }, [])

  // Fetch Wins
  const fetchWins = async () => {
    const res = await fetch('http://localhost:5000/gameScore/userScore/')

    const data = await res.json()

    return data.wins
  }

  // Fetch Losses
  const fetchLosses = async () => {
    const res = await fetch('http://localhost:5000/gameScore/userScore/')

    const data = await res.json()

    return data.losses
  }

  // Fetch # of Guesses left
  const fetchGuesses = async () => {
    const res = await fetch('http://localhost:5000/gameScore/userScore/')

    const data = await res.json()

    return data.guesses
  }

  // Fetch Letter
  const fetchLetter = async (id) => {
    const res = await fetch('http://localhost:5000/guessLetters/' + id)
    const data = await res.json()

    return data
  }

  // Fetch Word
  const fetchWord = async () => {
    const res = await fetch(`http://localhost:5000/gameWord/`)
    const data = await res.json()
    return data[0].id
  }

  // Fetch Game letters
  const fetchGameLetters = async () => {
    const gameWord = await fetchWord()
    console.log(gameWord,'fetching letters from word')
    //const gameWord = gameWordData.word
    let newGameLetters = new Array()

    for (let i = 0; i < gameWord.length; i++) {
      const id = gameWord[i]
      const gameLetter = await fetchLetter(id)

      const updGameLetter = { ...gameLetter, id: i, text: id }
      newGameLetters.push(updGameLetter)
    }

    setGameLetters(newGameLetters)

    return newGameLetters
  }

  // Fetch User Scoring Data
  const fetchScore = async () => {
    const res = await fetch('http://localhost:5000/gameScore/userScore/')

    const data = await res.json()

    return data
  }

  // Set Guesses in the back end
  const updateGuesses = async (guesses) => {
    // Get Current User Score Data
    const userScore = await fetchScore()

    // Update the Current User Score Data with new no. of guesses and replace
    const updScore = { ...userScore, guesses: guesses }
    console.log(updScore)
    const res = await fetch('http://localhost:5000/gameScore/userScore/', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updScore)
    })

    // Set number of guesses in Application to new amount of guesses
    setGuesses(guesses)
  }

  // Reset Guesses back to 10
  const resetGuesses = async () => {
    const defaultGuesses = 10
    await updateGuesses(defaultGuesses)

    setGuessedLetters([])
  }

  // Check Guessed
  const checkGuessed = async (letter) => {

  }

  // Check User Letter Guess
  const checkGuess = async (letter) => {
    // Fetch current No. Guesses
    const guesses = await fetchGuesses()
    // Prepare to subtract one guess from current no. of guesses if needed
    const leftoverGuesses = guesses - 1
    // Check if Letter Has been guessed
    const alreadyGuessed = guessedLetters.includes(letter)
    // Check if Letter in the Game Word
    const inGameWord = gameLetters.includes(letter)

    // Check if user guessed all of them
    const win = await checkWin()

    // Hide Already Guessed Alert - All Purpose Safety Catch
    setShowAlreadyGuessed(false)

    if (alreadyGuessed) {
      // Case 1: Letter has been guessed
      setShowAlreadyGuessed(true)
    }
    else if (win) {
      // Case 2: Letter makes user win
      addWin()

      setShowGuessLetter(false)
      setShowUserWon(true)
    }
    else if (inGameWord === false && leftoverGuesses === 0 && guesses !== 0) {
      // Case 3: Letter makes user lose and use all their guesses
      await addLoss()
      await updateGuesses(leftoverGuesses)

      setShowGuessLetter(false)
      setShowUserLoss(true)
      addAllGuesses()
    }
    else if (inGameWord === false && leftoverGuesses !== 0 && guesses !== 0) {
      // Case 4: Letter is not in the game word and user loses one additional guess
      updateGuesses(leftoverGuesses)
    }
  }

  // Check if User has won
  const checkWin = async () => {
    const win = !displayLetters.includes('_')
    return !win
  }

  // Add to Loss Count
  const addLoss = async () => {
    // Get Current User Score Data
    const userScore = await fetchScore()

    // Set new losses
    const updLosses = losses + 1

    // Update the Current User Score Data with 1+ Loss
    const updScore = { ...userScore, losses: updLosses }

    const res = await fetch('http://localhost:5000/gameScore/userScore/', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updScore)
    })

    setLosses(updLosses)
  }

  // Add to Win Count
  const addWin = async () => {
    // Get Current User Score Data
    const userScore = await fetchScore()
    const wins = await fetchWins()

    // Set new losses
    const updWins = wins + 1

    // Update the Current User Score Data with 1+ Loss
    const updScore = { ...userScore, wins: updWins }

    const res = await fetch('http://localhost:5000/gameScore/userScore/', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updScore)
    })

    setWins(updWins)
  }

  // Replace Game Word in db.json
  const replaceGameWord = async (word) => {

    // Set Game word
    setWord(word)
    // Set the Unique Game Letters
    setGameLetters([...new Set(word.split(""))])
    // Set the Display Letters, which is '_' AKA blank letters
    setDisplayLetters(new Array(word.length).fill('_'))

/*    console.log('the word', { word })
    const res = await fetch('http://localhost:5000/gameWord/1', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({word})
    })*/
  }

  // Add Guess to Already Guessed Letters
  const addGuess = async (letter) => {
    const alreadyGuessed = guessedLetters.includes(letter)
    if (alreadyGuessed === false) {
      await setGuessedLetters([...guessedLetters, letter])
    }
  }

  // Add All Letters to Already Guessed Letters
  const addAllGuesses = async() => {
    setGuessedLetters(['a', 'b', 'c', 'd', 'e',
                       'f', 'g', 'h', 'i', 'j',
                       'k', 'l', 'm', 'n', 'o',
                       'p', 'q', 'r', 's', 't',
                       'u', 'v', 'w', 'x', 'y',
                       'z'
                      ])
  }
 
  return (
    <div className="container">
      <Header wins={wins} losses={losses}/>
      <GameWord
        guessedLetters={guessedLetters} word={word} />
      {showGuessLetter && <GuessLetter
        checkGuess={checkGuess}
        addGuess={addGuess}
        guesses={guesses}
      />}
      <Alert
        showUserWon={showUserWon}
        showUserLoss={showUserLoss}
        showAlreadyGuessed={showAlreadyGuessed}
      />
      <Button
        // toggleGameLetters={toggleGameLetters}
        replaceGameWord={replaceGameWord}
        resetGuesses={resetGuesses}
        showGuess={() => setShowGuessLetter(true)}
        showUserWon={() => setShowUserWon(false)}
        showUserLoss={() => setShowUserLoss(false)}
        showAlreadyGuessed={() => setShowAlreadyGuessed(false)}
      />
    </div>
  );
}

export default App;
