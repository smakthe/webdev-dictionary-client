import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import axios from 'axios';
import './WordList.css';

axios.defaults.baseURL = 'http://localhost:3001';

const WordList = ({ selectedLetter }) => {
  const [allWords, setAllWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWord, setExpandedWord] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/words');
        setAllWords(response.data);
        setFilteredWords(response.data);
      } catch (error) {
        console.error('Error fetching all words:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (selectedLetter) {
      const filtered = allWords.filter((wordObj) =>
        wordObj.word.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(allWords);
    }
  }, [selectedLetter, allWords]);

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 50);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const searchedWords = filteredWords.filter(
    (wordObj) =>
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

  if (isLoading) {
    return (
      <div className="wordlist">
        <ClipLoader size={50} color={'#1abc9c'} loading={isLoading} />
      </div>
    );
  }

  if (searchedWords.length === 0) {
    return (
      <div className="wordlist wordlist-no-words">
        No words match your search.
      </div>
    );
  }

  return (
    <div className="wordlist">
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
        {searchedWords.map((wordObj) => (
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