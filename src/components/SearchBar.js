import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Avatar, Box } from '@mui/material';
import axios from 'axios';

const SearchBar = () => {
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
            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    <Avatar src={option.profilePictureUrl} alt={option.firstname} sx={{ mr: 1 }} />
                    {`${option.firstname} ${option.lastname}`}
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
        />
    );
};

export default SearchBar;