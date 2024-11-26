import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLetter } from './LetterContext';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';

const Sidebar = lazy(() => import('./components/Sidebar'));
const WordList = lazy(() => import('./components/WordList'));

const App = () => {
  const { selectedLetter, setSelectedLetter } = useLetter();

  return (
    <ErrorBoundary>
      <Router>
        <Header/>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Suspense fallback={<div>Loading Sidebar...</div>}>
                    <Sidebar setSelectedLetter={setSelectedLetter} />
                  </Suspense>
                  <Suspense fallback={<div>Loading Word List...</div>}>
                    <WordList selectedLetter={selectedLetter} />
                  </Suspense>
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
