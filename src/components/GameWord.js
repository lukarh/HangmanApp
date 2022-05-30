import GameLetter from './GameLetter'

const GameWord = ({ guessedLetters, word }) => {

  return (
      <div className='flexbox-container'>
        {word.split('').map((letter, i) => (
          <GameLetter key={i} gameLetter={letter} guessedLetters={guessedLetters} />
        ))}
      </div>
      )
}


export default GameWord

// https://stackoverflow.com/questions/55476980/aligning-few-components-horizontally-in-react/55478236 horizontal component

/*{
  {
    gameLetters.map((gameLetter) => (
      <GameLetter key={gameLetter.id} gameLetter={gameLetter} />
    ))
  }
}*/