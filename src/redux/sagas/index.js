import { all } from 'redux-saga/effects';

import Saga from './Saga';

export function* sagas() {
  yield all([Saga]);
}
