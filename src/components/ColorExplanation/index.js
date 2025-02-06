import './index.css'

const ColorExplanation = () => (
  <div className="color-explanation">
    <h3>Color Coding Explanation:</h3>
    <ul>
      <li>
        <strong className="green-cls">Green:</strong> Correct letter in the
        correct position.
      </li>
      <li>
        <strong className="yellow-cls">Yellow:</strong> Correct letter in the
        wrong position.
      </li>
      <li>
        <strong className="gray-cls">Gray:</strong> Incorrect letter (not in the
        word).
      </li>
    </ul>
  </div>
)

export default ColorExplanation
