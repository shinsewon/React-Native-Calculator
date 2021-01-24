import {combineReducers} from 'redux';
import calculation from './calculation';

const rootReducer = combineReducers({
  calculation,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
