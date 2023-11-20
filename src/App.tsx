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
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/wikipedia-anthropologist/"
            element={<HomePage />}
          />
          <Route
            path="/wikipedia-anthropologist/blocks/:type?"
            element={<BlocksTable />}
          />
          <Route
            path="/wikipedia-anthropologist/edits"
            element={<EditsTable>Edits Table</EditsTable>}
          />
          <Route
            path="/wikipedia-anthropologist/about"
            element={<AboutPage />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
