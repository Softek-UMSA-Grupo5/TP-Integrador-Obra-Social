import axios from 'axios';
import OfficeData from '../models/Office';

interface SaveOfficeResponse {
  success: boolean;
  message: string;
}

export const saveOffice = async (office: OfficeData): Promise<SaveOfficeResponse> => {
  const response = await axios.post<SaveOfficeResponse>('URL_DEL_BACKEND', office);
  return response.data;
};
