import {
  DOCUMENT_CREATE_CLEAR_ALL,
  DOCUMENT_CREATE_SET_TYPE,
  DOCUMENT_CREATE_SET_FORM,
} from '../Document.actionTypes';

const DEFAULT_STATE = {
  type: null,
  form: null,
};

export const documentCreateReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DOCUMENT_CREATE_SET_TYPE:
      return {
        type: action.payload.type,
      };
    case DOCUMENT_CREATE_SET_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case DOCUMENT_CREATE_CLEAR_ALL:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

const getDocumentTypeForCreate = state => state.type;
const getDocumentFormValues = state => state.form;

export default {
  getDocumentTypeForCreate,
  getDocumentFormValues,
};
