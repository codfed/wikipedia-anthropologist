import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          I have always been interested in the human element behind Wikipedia. 
          In October 2023 I started to play around with the Wikipedia API in some
          Jekyll files. I got sick of building tables through javascript to display 
          the results. This app is an experiment to see how React handles this task.
        </p>
        <a
          className="App-link"
          href="https://codfed.github.io/github-pages-with-docker/"
          target="_blank"
          rel="noopener noreferrer"
        >
          This was the work leading up to this.
        </a>
      </header>
    </div>
  );
}

export default App;
