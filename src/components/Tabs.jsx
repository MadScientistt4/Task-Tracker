import React from "react";

function Tabs({ isCompletedView, setIsCompletedView }) {
  return (
    <div className="btn-area">
      <button
        className={`secondaryBtn ${!isCompletedView && "active"}`}
        onClick={() => setIsCompletedView(false)}
      >
        Pending
      </button>

      <button
        className={`secondaryBtn ${isCompletedView && "active"}`}
        onClick={() => setIsCompletedView(true)}
      >
        Completed
      </button>
    </div>
  );
}

export default Tabs;
