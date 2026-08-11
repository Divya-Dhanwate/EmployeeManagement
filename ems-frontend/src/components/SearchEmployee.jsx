import React, { useState } from 'react';
const SearchEmployee = ({ searchTerm, setSearchTerm }) => {

  return (
    <div>
        <input type="text"
        placeholder='Search Employee'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
  )
}

export default SearchEmployee