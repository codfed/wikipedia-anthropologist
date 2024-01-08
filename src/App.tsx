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
import User from './pages/User';
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
          element={<EditsTable>Most Recent Edits</EditsTable>}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/user/:username"
          element={<User />}
        />
      </Routes>
    </Container>
  );
}

export default App;
