import PropTypes from 'prop-types'

const Score = ({ wins, losses }) => {

    return (
        <p>Wins: {wins} Losses: {losses}</p>
        )
}

Score.defaultProps = {
    wins: 0,
    losses: 0
}

Score.propTypes = {
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired
}

export default Score