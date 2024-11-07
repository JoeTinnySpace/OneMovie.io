import './ArrowKeys.css';

const ArrowKeys = () => {
  return (
    <div className="keyboard-container">
      {/* Top Row (Up Arrow) */}
      <div className="arrow-row">
        <div className="arrow-key">
          <div className="arrow up"></div>
          <span className="label">Skip </span>
        </div>
      </div>

      {/* Middle Row (Left and Right Arrows) */}
      <div className="arrow-row ">
        <div className="arrow-key px-10">
          <div className="arrow left"></div>
          <span className="label">Previous</span>
        </div>
        <div className="arrow-key px-10">
          <div className="arrow right"></div>
          <span className="label">Next</span>
        </div>
      </div>

      {/* Bottom Row (Down Arrow) */}
      <div className="arrow-row">
        <div className="arrow-key">
          <div className="arrow down"></div>
          <span className="label">Add to collection</span>
        </div>
      </div>
    </div>
  );
};

export default ArrowKeys;
