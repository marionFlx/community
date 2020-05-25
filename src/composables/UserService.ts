import axios from 'axios';
import { UserModel } from '@/models/UserModel';

export function useUserService() {
  return {
    async register(user: UserModel): Promise<UserModel> {
      const response = await axios.post<UserModel>('http://localhost:3007/users', user);
      return response.data;
    }
  };
}
