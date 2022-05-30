const Alert = ({ showUserWon, showUserLoss, showAlreadyGuessed }) => {

  return (
    <div>
      {showUserWon && <div>
        <h3 style={{ "color": "green" }}>
          You won!
        </h3>
        <p style={{ "color": "green" }}>
          Feel free to start a new game!
        </p>
      </div>}
      {showUserLoss && <div>
        <h3 style={{ "color": "red" }}>
          You lost!
        </h3>
        <p style={{ "color": "red" }}>
          Feel free to try again!
        </p>
      </div>}
      {showAlreadyGuessed && <div>
        <h3 style={{ "color": "blue" }}>
          You already guessed this letter!
        </h3>
        <p style={{ "color": "blue" }}>
          Please guess a letter that you haven't already used previously!
        </p>
      </div>}
    </div>
  )
}

export default Alert