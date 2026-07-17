/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const words = [
  'planet', 'galaxy', 'rocket', 'nebula', 'comet',
  'meteor', 'saturn', 'eclipse', 'gravity', 'orbit',
  'cosmos', 'jupiter'
]

const maxStrikes = 3
const maxPasses = 3

function App () {
  // load saved game from local storage, otherwise start fresh
  const [gameWords, setGameWords] = React.useState(
    JSON.parse(localStorage.getItem('gameWords')) || shuffle(words)
  )
  const [points, setPoints] = React.useState(
    Number(localStorage.getItem('points')) || 0
  )
  const [strikes, setStrikes] = React.useState(
    Number(localStorage.getItem('strikes')) || 0
  )
  const [passes, setPasses] = React.useState(
    localStorage.getItem('passes') !== null
      ? Number(localStorage.getItem('passes'))
      : maxPasses
  )
  const [guess, setGuess] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [scrambled, setScrambled] = React.useState('')

  // scramble the current word whenever the word list changes
  React.useEffect(() => {
    if (gameWords.length > 0) {
      let mixed = shuffle(gameWords[0])
      // reshuffle if it accidentally matches the original word
      while (mixed === gameWords[0]) {
        mixed = shuffle(gameWords[0])
      }
      setScrambled(mixed)
    }
  }, [gameWords])

  // save the game to local storage after every change
  React.useEffect(() => {
    localStorage.setItem('gameWords', JSON.stringify(gameWords))
    localStorage.setItem('points', points)
    localStorage.setItem('strikes', strikes)
    localStorage.setItem('passes', passes)
  }, [gameWords, points, strikes, passes])

  function inputHandler (e) {
    setGuess(e.target.value)
  }

  function formHandler (e) {
    e.preventDefault()

    if (guess === '') {
      return
    }

    if (guess.toLowerCase() === gameWords[0].toLowerCase()) {
      setPoints(points + 1)
      setMessage('Correct! Here is your next word.')
      setGameWords(gameWords.slice(1))
    } else {
      setStrikes(strikes + 1)
      setMessage('Incorrect. Try again!')
    }

    setGuess('')
  }

  function passHandler () {
    if (passes > 0) {
      setPasses(passes - 1)
      setGameWords(gameWords.slice(1))
      setMessage('Word passed.')
      setGuess('')
    }
  }

  function resetHandler () {
    setGameWords(shuffle(words))
    setPoints(0)
    setStrikes(0)
    setPasses(maxPasses)
    setMessage('')
    setGuess('')
  }

  // split the scrambled word into letter tiles
  const letters = scrambled.split('').map((letter, id) => ({ id, letter }))

  // game over screen
  if (gameWords.length === 0 || strikes >= maxStrikes) {
    return (
      <div className="game">
        <h1>Scramble<span>.</span></h1>

        {strikes >= maxStrikes ? (
          <h2 className="end-title">Game Over!</h2>
        ) : (
          <h2 className="end-title">You Win!</h2>
        )}

        <p className="end-message">
          You finished with {points} {points === 1 ? 'point' : 'points'} and {strikes} {strikes === 1 ? 'strike' : 'strikes'}.
        </p>

        <button className="reset-btn" onClick={resetHandler}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="game">
      <h1>Scramble<span>.</span></h1>

      <div className="stats">
        <div className="stat">
          <p className="stat-number">{points}</p>
          <p className="stat-label">Points</p>
        </div>
        <div className="stat">
          <p className="stat-number">{strikes} / {maxStrikes}</p>
          <p className="stat-label">Strikes</p>
        </div>
        <div className="stat">
          <p className="stat-number">{passes}</p>
          <p className="stat-label">Passes</p>
        </div>
      </div>

      {message !== '' && (
        <p className={message.includes('Correct') ? 'message correct' : 'message incorrect'}>
          {message}
        </p>
      )}

      <div className="word">
        {letters.map(item => (
          <div className="tile" key={item.id}>{item.letter}</div>
        ))}
      </div>

      <form onSubmit={formHandler}>
        <input
          value={guess}
          onChange={inputHandler}
          type="text"
          placeholder="Type your guess and hit enter"
          autoFocus
        />
      </form>

      <button className="pass-btn" onClick={passHandler} disabled={passes === 0}>
        Pass ({passes} left)
      </button>

      <p className="hint">Words remaining: {gameWords.length}</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
