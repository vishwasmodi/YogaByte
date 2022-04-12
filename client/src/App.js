import React from "react";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <Routes
        style={{
          backgroundColor: "#f0f0f0",
          backgroundImage: `url(
            "https://www.transparenttextures.com/patterns/batthern.png"
          )`,
        }}
      />
    </div>
  );
}

export default App;
