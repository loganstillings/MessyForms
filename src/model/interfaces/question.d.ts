import { ISubInput } from './sub-input';

export interface IQuestion {
  Question: string;
  QuestionTypeId: number;
  SubInputs: ISubInput[];
}
