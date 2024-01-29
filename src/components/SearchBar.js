// SearchBar.js

import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Avatar, Box } from '@mui/material';
import axios from 'axios';

const SearchBar = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/profile/search?name=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);


  return (
    <Autocomplete
      options={searchResults}
      clearOnBlur
      freeSolo
      selectOnFocus={false}
      getOptionLabel={(option) => `${option.profile.firstname} ${option.profile.lastname}`}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Avatar src={option.profile.profilePictureUrl} alt={option.profile.firstname} sx={{ mr: 1 }} />
          {`${option.profile.firstname} ${option.profile.lastname}`}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      onChange={(event, value) => {
        // Check if value is truthy before passing it further
        if (value) {
          onChange(value);
        }
      }}
    />
  );
};

export default SearchBar;
