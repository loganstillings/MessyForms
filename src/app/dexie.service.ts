import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('DexieDb');
    this.version(1).stores({
      questions:
        'Question,QuestionTypeId,SubInputs,ConditionValue,ConditionTypeId',
    });
  }
}
