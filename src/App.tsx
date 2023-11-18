import * as React from 'react';
import logo from './logo.svg';
import Button from './components/Button';
import EditsTable from './components/EditsTable';
import BlocksTable from './components/BlocksTable';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EditsTable>Edits Table Child</EditsTable>
        <BlocksTable>Blocks Table Title</BlocksTable>

        <Button
          color="danger"
          onClick={() => alert('Button clicked!!!')}
        >
          We're gonna need a bigger boat
        </Button>

        <p>
          I have always been interested in the human element behind Wikipedia.
          In October 2023 I started to play around with the Wikipedia API in
          some Jekyll files. I got sick of building tables through javascript to
          display the results. This app is an experiment to see how React
          handles this task.
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
