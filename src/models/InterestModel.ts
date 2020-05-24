import { InterestTypeEnum } from '@/enums/InterestTypeEnum';

export interface InterestModel {
  id: number;
  label: string;
  type: InterestTypeEnum;
}
