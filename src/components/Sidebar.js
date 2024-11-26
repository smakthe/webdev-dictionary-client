import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ setSelectedLetter }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const handleLetterSelect = useCallback((letter) => {
    setSelectedLetter(letter);
  }, [setSelectedLetter]);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div
        className="toggle-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand' : 'Collapse'}
        role="button"
        aria-expanded={!isCollapsed}
      >
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </div>
      {!isCollapsed && (
        <ul>
          {alphabet.map((letter) => (
            <li
              key={letter}
              onClick={() => handleLetterSelect(letter)}
              className="letter-item"
              tabIndex="0" // Make letter item focusable
            >
              {letter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
