import { useState } from 'react'
import Guesses from './Guesses'
import Hangman from './Hangman'


const GuessLetter = ({ checkGuess, addGuess, guesses }) => {

  const [letter, setLetter] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (/[^a-z]/i.test(letter)) {
      console.log('entered')
      alert('Only letter inputs are valid!')
      return
    }
    checkGuess(letter)
    addGuess(letter)

    setLetter('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Guess a Letter</label>
        <input
          type='text'
          placeholder='Type a Letter'
          maxLength="1"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        />
      </div>

      <input type='submit' value='Guess Letter' className='btn btn-block' />
      <Hangman guesses={guesses} />
      <Guesses guesses={guesses} />
    </form>
    )

}

export default GuessLetter