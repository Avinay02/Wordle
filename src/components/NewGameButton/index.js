import './index.css'

const NewGameButton = props => {
  const {startNewGame} = props
  return (
    <div className="new-game">
      <button type="button" onClick={startNewGame}>
        Start New Game
      </button>
    </div>
  )
}
export default NewGameButton
