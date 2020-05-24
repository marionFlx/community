import axios from 'axios';
import { MemberModel } from '@/models/MemberModel';

export function useMemberService() {
  return {
    async list(): Promise<Array<MemberModel>> {
      const response = await axios.get<Array<MemberModel>>('http://localhost:3007/members', {
        params: { status: 'ACTIVE' }
      });
      return response.data;
    }
  };
}
