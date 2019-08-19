import {
  DOCUMENT_LIST_SET_DATA,
  DOCUMENT_LIST_CLEAR_ALL,
  DOCUMENT_LIST_SET_TYPE,
  DOCUMENT_LIST_SET_PAGE,
  DOCUMENT_LIST_SET_DELETED_STATUS,
} from '../Document.actionTypes';
import { DOCUMENT_TYPES, PAGINATION } from '../../helpers/constants';

const DEFAULT_STATE = {
  type: DOCUMENT_TYPES.ALL,
  data: [],
  page: PAGINATION.DEFAULT_PAGE,
  isDeleted: true,
};

export const documentListReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DOCUMENT_LIST_SET_DELETED_STATUS:
      return {
        ...state,
        isDeleted: action.payload.isDeleted,
      };
    case DOCUMENT_LIST_SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case DOCUMENT_LIST_SET_TYPE:
      return {
        ...state,
        type: action.payload.type,
      };
    case DOCUMENT_LIST_SET_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case DOCUMENT_LIST_CLEAR_ALL:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

const getDocumentListPage = state => state.page;
const getDocumentTypeFilter = state => state.type;
const getDocumentsData = state => state.data;
const isDisabledBackward = state => state.page === PAGINATION.DEFAULT_PAGE;
const isEmptyData = state => !state.data || !state.data.length;
const isDeleted = state => state.isDeleted;
const isDisabledForward = state =>
  (state.page >= PAGINATION.DEFAULT_PAGE && isEmptyData(state)) ||
  state.data.length < PAGINATION.LIMIT;

export default {
  getDocumentListPage,
  getDocumentTypeFilter,
  getDocumentsData,
  isDisabledBackward,
  isDisabledForward,
  isEmptyData,
  isDeleted,
};
