import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';

import { DexieService } from './dexie.service';
import { IQuestion } from '../model/interfaces/question';

@Injectable()
export class QuestionService {
  table: Dexie.Table<IQuestion, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('questions');
  }

  saveForm(arr: IQuestion[]): void {
    this.getAll()
      .then((existingQuestions: IQuestion[]) => {
        const questionsToRemove = existingQuestions.filter((eq: IQuestion) => {
          return arr.findIndex((q: IQuestion) => q.Id === eq.Id) === -1;
        });
        questionsToRemove.forEach((qtr: IQuestion) => {
          this.table.delete(qtr.Id).catch(this.catchError);
        });
        this.table.bulkPut(arr).catch(this.catchError);
      })
      .catch(this.catchError);
  }

  getAll(): Dexie.Promise<IQuestion[]> {
    return this.table.orderBy(':id').toArray();
  }

  private catchError(err: any): void {
    console.log(err);
  }
}
