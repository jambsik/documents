import { toastr } from 'react-redux-toastr';
import {
  DOCUMENT_CREATE_CLEAR_ALL,
  DOCUMENT_CREATE_SET_FORM,
  DOCUMENT_CREATE_SET_TYPE,
  DOCUMENT_LIST_SET_DATA,
  DOCUMENT_LIST_SET_DELETED_STATUS,
  DOCUMENT_LIST_SET_PAGE,
  DOCUMENT_LIST_SET_TYPE,
} from './Document.actionTypes';
import { HttpStatusCode } from '../../../helpers/httpStatusCode';
import { addDocument, deleteDocument, getDocuments } from '../../../API';
import applicationTexts from '../../../helpers/applicationTexts';
import { PAGINATION } from '../helpers/constants';

export const documentCreateClearAll = () => ({
  type: DOCUMENT_CREATE_CLEAR_ALL,
});

export const documentCreateSetType = type => ({
  type: DOCUMENT_CREATE_SET_TYPE,
  payload: {
    type,
  },
});

export const documentCreateSetForm = fieldChanged => ({
  type: DOCUMENT_CREATE_SET_FORM,
  payload: fieldChanged,
});

export const documentSaveForm = values => async dispatch => {
  const body = {
    ...values,
  };
  const response = await addDocument({ body });

  if (response.status === HttpStatusCode.OK) {
    toastr.success(response.data.message);
    dispatch(documentCreateClearAll());
    return;
  }

  toastr.error(response.data.message);
};

export const documentSetListPage = page => ({
  type: DOCUMENT_LIST_SET_PAGE,
  payload: {
    page,
  },
});
export const documentSetListType = type => ({
  type: DOCUMENT_LIST_SET_TYPE,
  payload: {
    type,
  },
});

export const documentSetListData = data => ({
  type: DOCUMENT_LIST_SET_DATA,
  payload: {
    data,
  },
});

export const documentSetDeletedStatus = isDeleted => ({
  type: DOCUMENT_LIST_SET_DELETED_STATUS,
  payload: {
    isDeleted,
  },
});

export const documentGetData = ({ type, page, limit }) => async dispatch => {
  const offset = (page - 1) * PAGINATION.LIMIT;
  const response = await getDocuments({
    type,
    offset,
    limit,
  });

  if (response.status === HttpStatusCode.OK) {
    dispatch(documentSetListData(response.data));
    return;
  }

  toastr.error(applicationTexts.errors.errorDuringCall);
};

export const onDeleteDocument = ({ id }) => async (dispatch, getState) => {
  const { type, page, limit } = getState().documentReducer.list;

  dispatch(documentSetDeletedStatus(false));

  const response = await deleteDocument({ id });

  if (response.status === HttpStatusCode.OK) {
    toastr.success(response.data.message);

    dispatch(documentGetData({ type, page, limit }));
    dispatch(documentSetDeletedStatus(true));
    return;
  }

  toastr.error(applicationTexts.errors.errorDuringCall);
};
