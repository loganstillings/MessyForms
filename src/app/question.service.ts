import { Injectable } from '@angular/core';
import { DexieService } from './dexie.service';
import { Dexie } from 'dexie';
import { IQuestion } from '../model/interfaces/question';

@Injectable()
export class QuestionService {
  table: Dexie.Table<IQuestion, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('questions');
  }

  saveForm(arr: IQuestion[]): void {
    this.getAll()
      .then((existingQuestions) => {
        let questionsToRemove = existingQuestions.filter((eq) => {
          return arr.findIndex((q) => q.Id === eq.Id) === -1;
        });
        questionsToRemove.forEach((qtr) => {
          this.table.delete(qtr.Id).catch(this.catchError);
        });
        this.table.bulkPut(arr).catch(this.catchError);
      })
      .catch(this.catchError);
  }

  getAll(): Dexie.Promise<IQuestion[]> {
    return this.table.orderBy(':id').toArray();
  }

  private catchError(err) {
    console.log(err);
  }
}
