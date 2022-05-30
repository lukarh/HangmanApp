const GameLetter = ({ gameLetter, guessedLetters }) => {
  return (
    <h2>
      {guessedLetters.includes(gameLetter) ? gameLetter : '_'}
    </h2>
  )
}

export default GameLetter