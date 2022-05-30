import PropTypes from 'prop-types'

const Button = ({ replaceGameWord, resetGuesses, showGuess, showUserWon, showUserLoss, showAlreadyGuessed }) => {

  // Generate new random word
  const randomWord = require('random-words')
  const word = randomWord()

  // 
  const onClick = () => {
    // toggleGameLetters({ id })
    replaceGameWord(word)
    resetGuesses()
    showGuess()
    showUserWon()
    showUserLoss()
    showAlreadyGuessed()
  }

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: 'steelBlue' }}
      className='btn'
    >
        Start New Game
    </button>
    )
}

Button.propTypes = {
  onClick: PropTypes.func
}

export default Button