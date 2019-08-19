import { combineReducers } from 'redux';
import fromDocumentCreate, {
  documentCreateReducer,
} from './create/index.reducer';
import fromDocumentList, { documentListReducer } from './list/index.reducer';

const getDocumentState = state => state.documentReducer;
export const documentReducer = combineReducers({
  create: documentCreateReducer,
  list: documentListReducer,
});

export const getDocumentTypeForCreate = state =>
  fromDocumentCreate.getDocumentTypeForCreate(getDocumentState(state).create);

export const getDocumentFormValues = state =>
  fromDocumentCreate.getDocumentFormValues(getDocumentState(state).create);

export const getDocumentListPage = state =>
  fromDocumentList.getDocumentListPage(getDocumentState(state).list);

export const getDocumentTypeFilter = state =>
  fromDocumentList.getDocumentTypeFilter(getDocumentState(state).list);

export const getDocumentsData = state =>
  fromDocumentList.getDocumentsData(getDocumentState(state).list);

export const isEmptyData = state =>
  fromDocumentList.isEmptyData(getDocumentState(state).list);

export const isDeleted = state =>
  fromDocumentList.isDeleted(getDocumentState(state).list);

export const isDisabledBackward = state =>
  fromDocumentList.isDisabledBackward(getDocumentState(state).list);

export const isDisabledForward = state =>
  fromDocumentList.isDisabledForward(getDocumentState(state).list);
