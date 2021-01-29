import React, { useState } from 'react';
import './SearchBar.css';
import { BsSearch } from 'react-icons/bs'

const SearchBar = (props) => {
  const [keyword, setKeyword] = useState("")
  const [zipcode, setZipcode] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = {
      keyword,
      zipcode,
    };
    console.log(newSearch);
    handleInputReset();
  }

  const handleInputReset = () => {
    setKeyword("")
    setZipcode("")
  }

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit} className="searchbox">
        <input
          type='text'
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder='Search by keyword'
        />
        <input
          type='text'
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
          placeholder='Zip Code'
        />
        <button className='searchButton' type='submit'>
          <BsSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar;
