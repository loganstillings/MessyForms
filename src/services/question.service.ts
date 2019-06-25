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

  saveForm(currentQuestions: IQuestion[]): void {
    this.getAll()
      .then((existingQuestions: IQuestion[]) => {
        const questionIdsToRemove = existingQuestions // Removing questions that are greater than the length of the current questions
          .filter(
            (topLevelQuestion) =>
              topLevelQuestion.Id >= currentQuestions.length,
          )
          .map((question) => question.Id);
        this.table.bulkDelete(questionIdsToRemove).then(() => {
          // delete those questions
          currentQuestions.map(
            // assign Id of current questions to be the index
            (currentQuestion, index) => (currentQuestion.Id = index),
          );
          this.table.bulkPut(currentQuestions).catch(this.catchError);
        });
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
