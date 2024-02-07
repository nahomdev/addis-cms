import React, { useState } from 'react';
import styled from '@emotion/styled';
import { space, layout } from 'styled-system';
import SongList from '../components/SongList';
import useSongService from '../services/song/services';
import { Song } from '../types/songs';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;  
  gap: 16px; 
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
interface Col8Props {
  width: number | number[];
}

const Col8 = styled.div<Col8Props>`
  ${space}
  ${layout}
`;

const Col4 = styled.div`
  // col 4
`;

const Home: React.FC = () => {
    const [song, setSong] = useState<Song>();
     const { songs, createSong } = useSongService();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); 
      createSong(song);
  };

  return (
    <GridContainer>
      <Col8 width={[1, 1]}> 
                <SongList /> 
      </Col8>
          <Col4> 
                <form onSubmit={handleSubmit}>
              <FormLabel>Title:</FormLabel>
          <FormInput
            type="text"
            name="title"
            
            onChange={handleChange}
          />

          <FormLabel>Artist:</FormLabel>
          <FormInput
            type="text"
            name="artist" 
            onChange={handleChange}
          />

          <FormLabel>Genre:</FormLabel>
          <FormInput
            type="text"
            name="genre" 
            onChange={handleChange}
          />

          <FormLabel>Album:</FormLabel>
          <FormInput
            type="text"
            name="album" 
            onChange={handleChange}
          />

                  <SaveButton type="submit">Save Changes</SaveButton>
                  </form>
      </Col4>
    </GridContainer>
  );
};

export default Home;
