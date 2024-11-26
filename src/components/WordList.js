import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import './WordList.css';
import allWords from '../wordsList.json';

const WordList = ({ selectedLetter }) => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWord, setExpandedWord] = useState(null);

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 200);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredWords = words.filter((wordObj) =>
    wordObj.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wordObj.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWordClick = (word) => {
    setExpandedWord(expandedWord === word ? null : word);
  };

  const highlightQuery = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  useEffect(() => {
    if (selectedLetter) {
      setIsLoading(true);
      setTimeout(() => {
        const fetchedWords = allWords[selectedLetter] || [];
        setWords(fetchedWords);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedLetter]);

  if (!selectedLetter) {
    return <div className="wordlist">Please select a letter from the sidebar.</div>;
  }

  if (isLoading) {
    return (
      <div className="wordlist">
        <ClipLoader size={50} color={'#1abc9c'} loading={isLoading} />
      </div>
    );
  }

  if (filteredWords.length === 0) {
    return (
      <div className="wordlist wordlist-no-words">
        No words found for "{selectedLetter}".
      </div>
    );
  }

  return (
    <div className="wordlist">
      <h2 className="wordlist-heading">Words starting with "{selectedLetter}"</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search words or definitions..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {filteredWords.map((wordObj) => (
          <li
            key={wordObj.word}
            className="word-item"
            onClick={() => handleWordClick(wordObj)}
            dangerouslySetInnerHTML={{
              __html: expandedWord === wordObj
                ? `${highlightQuery(wordObj.word)}<div class="word-definition">${highlightQuery(
                    wordObj.definition
                  )}</div>`
                : highlightQuery(wordObj.word),
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
