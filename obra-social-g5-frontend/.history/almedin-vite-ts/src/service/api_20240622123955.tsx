import axios from 'axios';
import OfficeData from '../models/Office';

export const saveOffice = async (office: OfficeData): Promise<any> => {
  const response = await axios.post('URL_DEL_BACKEND', office);
  return response.data;
};
