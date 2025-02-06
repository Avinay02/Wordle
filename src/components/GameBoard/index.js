import {useState} from 'react'
import './index.css'

const GameBoard = props => {
  const {
    gameOver,
    wordToGuess,
    setAttempts,
    setGameOver,
    setGameWon,
    setGameLoss,
    attempts,
  } = props
  const [currentGuess, setCurrentGuess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [attemptCount, setAttemptCount] = useState(5)

  // Function to evaluate the guess against the target word
  const evaluateGuess = (guess, targetWord) => {
    const result = []
    const targetArray = targetWord.split('')

    // Loop through each character in the guess
    for (let i = 0; i < guess.length; i += 1) {
      if (guess[i] === targetArray[i]) {
        result.push('green')
        targetArray[i] = null // Mark the letter as used
      } else if (targetArray.includes(guess[i])) {
        result.push('yellow')
        targetArray[targetArray.indexOf(guess[i])] = null // Mark the letter as used
      } else {
        result.push('gray')
      }
    }

    return result
  }

  const handleSubmit = () => {
    // Validate if the input is exactly 5 letters and contains only alphabet characters
    if (currentGuess.length !== 5) {
      setErrorMsg('Please enter exactly 5 letters')
      return
    }

    if (!/^[A-Za-z]+$/.test(currentGuess)) {
      setErrorMsg('Please enter only letters (A-Z)')
      return
    }

    // Clear error messages if validation is passed
    setErrorMsg('')

    // Proceed with the guess evaluation
    const feedback = evaluateGuess(currentGuess.toUpperCase(), wordToGuess)

    setAttempts(prevAttempts => [
      ...prevAttempts,
      {guess: currentGuess, feedback},
    ])

    // Check if the guess matches the word
    if (attemptCount > 1) {
      if (currentGuess.toUpperCase() === wordToGuess.toUpperCase()) {
        setGameWon(true)
        setGameOver(true)
      }
    } else {
      if (currentGuess.toUpperCase() === wordToGuess.toUpperCase()) {
        setGameWon(true)
        setGameOver(true)
      }
      setGameOver(true)
      setGameLoss(true)
    }

    setCurrentGuess('')
    setAttemptCount(attemptCount - 1)
  }

  return (
    <div className="gameboard">
      <input
        type="text"
        value={currentGuess}
        onChange={e => setCurrentGuess(e.target.value.toUpperCase())}
        maxLength="5"
        disabled={gameOver}
      />
      <br />
      <button type="button" onClick={handleSubmit} disabled={gameOver}>
        Submit Guess
      </button>
      <p>{errorMsg}</p>

      <div className="feedback">
        {attempts.map(attempt => (
          <div className="guess-feedback">
            {attempt.guess.split('').map((letter, i) => (
              <div className={`letter ${attempt.feedback[i]}`}>{letter}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Display total attempts and remaining attempts */}
      <div className="status">
        <p>Total Attempts: 5</p>
        <p>Remaining Attempts: {attemptCount}</p>
      </div>
    </div>
  )
}

export default GameBoard
