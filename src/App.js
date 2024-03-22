import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const App = () => {
  const fields = ['Field 1', 'Field 2', 'Field 3']; // Sample fields array

  const [searchInput, setSearchInput] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && selectedFields.length > 0) {
      setSearchInput(searchInput + (searchInput ? ', ' : '') + selectedFields.join(', '));
      setSelectedFields([]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % fields.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + fields.length) % fields.length);
    }
  };

  const handleFieldSelect = (field) => {
    if (!selectedFields.includes(field)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleRemoveField = (field) => {
    setSelectedFields(selectedFields.filter((item) => item !== field));
  };

  const handleSearch = () => {
    console.log('Search with fields:', searchInput);
    // Implement your search functionality here
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setHighlightedIndex(-1);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="container">
      <h1>Search App</h1>
      <div className="search-bar">
      <div className="selected-fields">
        {selectedFields.map((field) => (
          <span key={field} className="selected-field">
            {field}
            <button onClick={() => handleRemoveField(field)}>x</button>
          </span>
        ))}
      </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        <ul className="field-list">
          {fields.map((field, index) => (
            <li
              key={field}
              onClick={() => handleFieldSelect(field)}
              className={highlightedIndex === index ? 'highlighted' : ''}
            >
              {field}
            </li>
          ))}
        </ul>
      </div>
  
    </div>
  );
};

export default App;
