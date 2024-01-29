// GroupCreationWindow.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Divider,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchBar from '../SearchBar';

const GroupCreationWindow = ({ isOpen, onClose, onCreateGroupDraft }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeople, setSelectedPeople] = useState([]);
    const theme = useTheme();
  
    const handleSearchBarChange = (selectedPerson) => {
      // Check if the person is not already in the selectedPeople array
      const isPersonSelected = selectedPeople.some((person) => person.id === selectedPerson.id);
  
      if (!isPersonSelected) {
        // Update the list of selected people
        setSelectedPeople((prevSelectedPeople) => [...prevSelectedPeople, selectedPerson]);
      }
    };
  
    const handleCreateGroup = () => {
      // Create a roomId based on selected people's IDs
      const roomId = null;
  
      // Create a unified object with profiles and roomId
      const groupData = {
        profiles: selectedPeople.map((person) => person.profile),
        roomId,
      };
  
      // Pass the created groupData to the callback function
      onCreateGroupDraft(groupData);
  
      // Clear the selected people and close the window
      setSelectedPeople([]);
      onClose();
    };
  
    const handleClose = () => {
      // Clear the selected people when the window is closed
      setSelectedPeople([]);
      onClose();
    };
  
  return (
    <Dialog open={isOpen} onClose={handleClose} sx={{ width: '100%' }}>
      <Stack direction="column" spacing={1} fullWidth>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={1} fullWidth>
            <SearchBar
              fullWidth
              onChange={handleSearchBarChange}
              sx={{ color: theme.palette.mode === 'light' ? '#080707' : theme.palette.text.primary }}
            />
            <Divider width={270} sx={{ alignSelf: 'center' }} />

            <List>
              {selectedPeople.map((person) => (
                <ListItem key={person.id}>
                  <Avatar
                    src={person.profile.profilePictureUrl}
                    alt={`${person.profile.firstname} ${person.profile.lastname}`}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                  />
                  <ListItemText primary={`${person.profile.firstname} ${person.profile.lastname}`} />
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => {
                      // Remove the person from the list
                      setSelectedPeople((prevSelectedPeople) =>
                        prevSelectedPeople.filter((p) => p.id !== person.id)
                      );
                    }}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGroup}
              disabled={selectedPeople.length < 2} // Disable button if less than 2 users are selected
            >
              Create Group
            </Button>
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default GroupCreationWindow;
