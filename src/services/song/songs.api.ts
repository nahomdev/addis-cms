 
import { type Song } from '../../types/songs';
import axios from 'axios';
 
export const getSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/song');
    console.log("response: ",response.data.data);
    return response.data.data;
  } catch (error) {
    // Handle error
    console.log("Error: ",error);
    throw new Error('Failed to fetch songs');
  }
};


export default getSongs;