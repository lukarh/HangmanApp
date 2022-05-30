import PropTypes from 'prop-types'
import Score from './Score'

const Header = ({ title, wins, losses }) => {

    return (
      <header className='header'>
        <h1>{title}</h1>
        <Score wins={wins} losses={losses} />
      </header>
    )
}

Header.defaultProps = {
    title: 'Hangman Game'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}


export default Header