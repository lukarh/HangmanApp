import PropTypes from 'prop-types'

const Guesses = ({ guesses }) => {

    return (
      <p> No. of Wrong Guesses Left: {guesses}</p>
        )
}

Guesses.defaultProps = {
    numGuesses: 10
}

Guesses.propTypes = {
  numGuesses: PropTypes.number.isRequired,
}

export default Guesses