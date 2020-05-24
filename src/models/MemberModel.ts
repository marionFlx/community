import { InterestModel } from './InterestModel';

export interface MemberModel {
  name: string;
  id: number;
  signupDate: string;
  interests: Array<InterestModel>;
}
