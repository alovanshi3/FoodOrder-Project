import React from 'react'
import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <form>
        <div className='input-group '>
        {/* input:text.form-control#search_field */}
            <input type="text" name="" placeholder='Search Your Favourite Restaurant...' 
            id="search_field" className="form-control"/>

            <div className="input-group-append">
              <button id='search_btn' className="btn ">
              <FaSearch className='fa fa-search' /> 
              </button>
            </div>
        </div>
    </form>
  )
}

export default Search


