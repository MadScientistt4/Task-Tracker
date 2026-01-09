import React from "react";

function Stats({ pending, completed }) {
  return (
    <div className="stats">
      <span>Pending: {pending}</span>
      <span>Completed: {completed}</span>
    </div>
  );
}

export default Stats;
