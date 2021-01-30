import React from 'react';
import './SearchBar.css'

const SearchBar = ({ query, setQuery, activePage }) => {
    const handleXClick = () => {
        setQuery("")
    }

    return (
        <div className="search-bar-div">
            <input
                className="search-bar"
                key="random1"
                maxLength={60}
                value={query}
                placeholder={"Search by events"}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleXClick}
                className="x-button"
            >
                X
            </button>
        </div>
    );
}

export default SearchBar;
