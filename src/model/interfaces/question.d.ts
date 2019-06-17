import { ISubInput } from './sub-input';

export interface IQuestion {
  Id: number;
  Question: string;
  QuestionTypeId: number;
  SubInputs: ISubInput[];
}
