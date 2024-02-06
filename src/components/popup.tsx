import React, { useState } from 'react';
import styled from '@emotion/styled';
import { type Song } from '../types/songs';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  songData: Song;  
  onSave: (updatedSong: Song) => void; 
}

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-top: 16px;

  &:hover {
    background-color: #b71c1c;
  }
`;

const SaveButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-top: 16px;
  margin-right: 8px;

  &:hover {
    background-color: #0d47a1;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, songData, onSave }) => {
    
    const [editedSong, setEditedSong] = useState(songData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSong);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PopupContainer>
      <PopupContent>
        <h2>Edit Song</h2>
              <form onSubmit={handleSubmit}>
             
          <FormLabel>Title:</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={editedSong.title}
            onChange={handleChange}
          />

          <FormLabel>Artist:</FormLabel>
          <FormInput
            type="text"
            name="artist"
            value={editedSong.artist}
            onChange={handleChange}
          />

          <FormLabel>Genre:</FormLabel>
          <FormInput
            type="text"
            name="genre"
            value={editedSong.genre}
            onChange={handleChange}
          />

          <FormLabel>Album:</FormLabel>
          <FormInput
            type="text"
            name="album"
            value={editedSong.album}
            onChange={handleChange}
          />

          <SaveButton type="submit">Save Changes</SaveButton>
        </form>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;
