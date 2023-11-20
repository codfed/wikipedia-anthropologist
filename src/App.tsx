import * as React from 'react';
import logo from './logo.svg';

import Container from 'react-bootstrap/Container';

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import BlocksTable from './components/BlocksTable';
import EditsTable from './components/EditsTable';
import NavBar from './components/NavBar';

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/blocks/:type?"
          element={<BlocksTable />}
        />
        <Route
          path="/edits"
          element={<EditsTable>Edits Table</EditsTable>}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
      </Routes>
    </Container>
  );
}

export default App;
