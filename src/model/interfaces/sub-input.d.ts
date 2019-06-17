import { IQuestion } from './question';

export interface ISubInput extends IQuestion {
  ConditionTypeId: number;
  ConditionValue: string | number;
}
