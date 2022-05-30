const Hangman = ({ guesses }) => {
  const errors = 10 - guesses

  return (
    <svg height="250" width="200">
      {/* <!-- Rod --> */}
      <line x1="60" y1="20" x2="140" y2="20"
        style={lineStyle} />
      <line x1="140" y1="20" x2="140" y2="50"
        style={lineStyle} />
      <line x1="60" y1="20" x2="60" y2="230"
        style={lineStyle} />
      <line x1="20" y1="230" x2="100" y2="230"
        style={lineStyle} />

      // Head
      {errors > 0 &&
        <circle cx="140" cy="70" r="20" />
      }
      // Left Eye
      {errors > 1 &&
        <line x1="130" y1="60" x2="138" y2="70"
         style={altLineStyle} />
      }
      {errors > 1 &&
        <line x1="138" y1="60" x2="130" y2="70"
         style={altLineStyle} />
      }
      // Right Eye
      {errors > 2 &&
        <line x1="142" y1="60" x2="150" y2="70"
         style={altLineStyle} />
      }
      {errors > 2 &&
        <line x1="150" y1="60" x2="142" y2="70"
         style={altLineStyle} />
      }
      // Mouth
      {errors > 3 &&
        <line x1="130" y1="78" x2="150" y2="78"
          style={altLineStyle} />
      }
      // Nose
      {errors > 4 &&
        <circle cx="140" cy="72" r="2" fill='white'/>
      }
      // Body
      {errors > 5 &&
        <line x1="140" y1="90" x2="140" y2="150"
        style={lineStyle} />
      }
      // Arms
      {errors > 6 &&
        <line x1="140" y1="120" x2="120" y2="100"
        style={lineStyle} />
      }
      {errors > 7 &&
        <line x1="140" y1="120" x2="160" y2="100"
        style={lineStyle} />
      }
      // Legs
      {errors > 8 &&
        <line x1="140" y1="150" x2="120" y2="180"
        style={lineStyle} />
      }
      {errors > 9 &&
        <line x1="140" y1="150" x2="160" y2="180"
        style={lineStyle} />
      }
    </svg>
    )
}

export default Hangman

const lineStyle = { "stroke": "black", "strokeWidth": "2" }
const altLineStyle = { "stroke": "white", "strokeWidth": "2" }