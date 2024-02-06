import React, { useEffect, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import useSongService from '../services/song/services';
import styled from '@emotion/styled';
import { type Song } from '../types/songs';
import Popup from './popup';
import DeleteConfirmation from './DeleteConfirmation';

interface SongListItemProps {
  styles?: SerializedStyles;
}

const SongTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  text-align: left; 
`;

const SongListItem = styled.tr<SongListItemProps>`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }

  &:hover {
    background-color: #e0e0e0;
  }

  ${({ styles }) => styles}
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d47a1;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2e7d32;
  }
`;

interface SongListProps {}

const SongList: React.FC<SongListProps> = () => {
    const { songs, fetchAllSongs } = useSongService();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopupOpen, setPopupOpen] = useState(false);
  const [editedSong, setEditedSong] = useState<Song | null>(null);
 const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);

  const songsPerPage = 5;

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    const handleEditClick = (song: Song) => {
        console.log(song);
    setEditedSong(song);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setEditedSong(null);
  };

    const handleSaveChanges = (updatedSong: Song) => {
        
        setPopupOpen(false);
        setEditedSong(null);
    }

      const handleDeleteClick = (song: Song) => {
    setSongToDelete(song);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSongToDelete(null);
  };

     const handleConfirmDelete = () => {
    // Implement logic to delete the song
    // In this example, we'll just update the songs array for simplicity
    const updatedSongs = songs.filter((song) => song.id !== songToDelete?.id);
    // You might need to dispatch an action to update the state in a real app
    // For simplicity, we directly update the state here
    setDeleteConfirmationOpen(false);
    setSongToDelete(null);
  };

  return (
    <div>
      <SongTable>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Album</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map((song) => (
            <SongListItem key={song.id}>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.genre}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>
                <ActionButtons>
                  <EditButton onClick={() => handleEditClick(song)}>Edit</EditButton>
                          <DeleteButton onClick={() => handleDeleteClick(song)}>Delete</DeleteButton>
                </ActionButtons>
                  </TableCell>
                  
            </SongListItem>
          ))}
        </tbody>
          </SongTable>
          
      {/* <PaginationContainer>
        {[...Array(Math.ceil(songs.length / songsPerPage)).keys()].map((number) => (
          <PaginationButton key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </PaginationButton>
        ))}
      </PaginationContainer> */}
          {isPopupOpen ? 
           <Popup isOpen={isPopupOpen} songData={editedSong} onSave={handleSaveChanges} onClose={handleClosePopup} />
              : null}
          
          <DeleteConfirmation isOpen={isDeleteConfirmationOpen} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
 
    </div>
  );
};

export default SongList;
