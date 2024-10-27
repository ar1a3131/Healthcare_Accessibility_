// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Map from './pages/Map';
import State from './pages/State';
import Address from './pages/Address';
import './App.css'; 
import { SelectedStateProvider } from './pages/SelectedStateContext'; 

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={500}
      >
        <SelectedStateProvider>
          <Routes location={location}>
            <Route path="/" element={<Map />} />
            <Route path="/address/:stateName" element={<Address />} />
            <Route path="/state/:stateName" element={<State />} />
          </Routes>
        </SelectedStateProvider>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
