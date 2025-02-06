import {useState, useEffect} from 'react'
import GameBoard from './components/GameBoard'
import ColorExplanation from './components/ColorExplanation'
import NewGameButton from './components/NewGameButton'
import './App.css'

const wordList = [
  {
    word: 'APPLE',
    meaning: 'A round fruit with red or green skin and a whitish interior.',
  },
  {
    word: 'BREAD',
    meaning: 'A staple food made from flour, water, and usually yeast.',
  },
  {word: 'HOUSE', meaning: 'A building for human habitation.'},
  {
    word: 'PLANT',
    meaning:
      'A living organism typically found in the ground, producing oxygen.',
  },
  {
    word: 'SMILE',
    meaning:
      'A facial expression in which the corners of the mouth are turned upward.',
  },
  {
    word: 'TRAIN',
    meaning:
      'A series of connected vehicles that run on tracks and transport people or goods.',
  },
  {
    word: 'CLOUD',
    meaning: 'A visible mass of condensed water vapor floating in the sky.',
  },
  {
    word: 'OCEAN',
    meaning:
      'A vast body of salt water that covers most of the Earth’s surface.',
  },
  {
    word: 'CHAIR',
    meaning:
      'A separate seat for one person, typically with a back and four legs.',
  },
  {
    word: 'CANDY',
    meaning:
      'A sweet food made from sugar or syrup and often flavored or colored.',
  },
]

const App = () => {
  const [gameOver, setGameOver] = useState(false)
  const [wordToGuess, setWordToGuess] = useState('')
  const [meaning, setMeaning] = useState('')
  const [attempts, setAttempts] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const [gameLoss, setGameLoss] = useState(false)
  const [darkMode, setDarkMode] = useState(false) // State to manage dark mode

  // Function to reset the game and pick a new random word
  const startNewGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setWordToGuess(randomWord.word)
    setMeaning(randomWord.meaning)
    setAttempts([])
    setGameOver(false)
    setGameWon(false)
    setGameLoss(false)
  }

  // Set initial word and meaning when the component mounts
  useEffect(() => {
    startNewGame()
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return gameWon || gameLoss ? (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {gameLoss && (
        <div className="loss-cls">
          <h1>Wordle Game</h1>
          <h2 className="win-heading">You Lost</h2>
          {/* Color Explanation */}
          <ColorExplanation />

          {/* New Game Button */}
          <NewGameButton startNewGame={startNewGame} />
        </div>
      )}
      {gameWon && (
        <div className="won-cls">
          <h1>Wordle Game</h1>
          <h2 className="win-heading">You Won</h2>
          {/* Color Explanation */}
          <ColorExplanation />

          {/* New Game Button */}
          <NewGameButton startNewGame={startNewGame} />
        </div>
      )}
    </div>
  ) : (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <h1>Wordle Game</h1>

      {/* Dark Mode Toggle Button */}
      {darkMode ? (
        <button
          type="button"
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
        >
          Toggle Light Mode
        </button>
      ) : (
        <button
          type="button"
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      )}

      {/* Game Board Component */}
      <GameBoard
        gameOver={gameOver}
        wordToGuess={wordToGuess}
        setAttempts={setAttempts}
        setGameOver={setGameOver}
        setGameWon={setGameWon}
        setGameLoss={setGameLoss}
        attempts={attempts}
      />

      {/* Color Explanation */}
      <ColorExplanation />

      {/* New Game Button */}
      <NewGameButton startNewGame={startNewGame} />

      {/* Display word meaning */}
      <div className="meaning">
        <h3>Word Meaning:</h3>
        <p>{meaning}</p>
      </div>
    </div>
  )
}

export default App
