import * as React from 'react';
import logo from './logo.svg';

import Container from 'react-bootstrap/Container';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import BlocksTable from './components/BlocksTable';
import EditsTable from './components/EditsTable';
import NavBar from './components/NavBar';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/wikipedia-anthropologist">
            <Route
              path=""
              element={<HomePage />}
            />
            <Route
              path="blocks"
              element={<BlocksTable>Blocks Table</BlocksTable>}
            />
            <Route
              path="edits"
              element={<EditsTable>Edits Table</EditsTable>}
            />
            <Route
              path="about"
              element={<AboutPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
