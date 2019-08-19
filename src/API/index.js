import { toastr } from 'react-redux-toastr';
import applicationTexts from '../helpers/applicationTexts';

export const API_CONSTANTS = {
  URL: 'https://node-api-caller.herokuapp.com',
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
  },
  HEADERS: {
    'Content-Type': 'application/json',
  },
  PATH: {
    DOCUMENTS: 'documents',
  },
};
export const restApiCall = async ({ url, opts }) => {
  let response = {};

  try {
    const apiResponse = await fetch(url, {
      headers: API_CONSTANTS.HEADERS,
      ...opts,
    });
    response = apiResponse.json();
  } catch (e) {
    toastr.error(applicationTexts.errors.errorDuringCall);
  }

  return response;
};

export const getDocuments = ({ type, offset, limit }) =>
  restApiCall({
    url: `${API_CONSTANTS.URL}/${API_CONSTANTS.PATH.DOCUMENTS}?type=${type}&offset=${offset}&limit=${limit}`,
    opts: {
      method: API_CONSTANTS.METHOD.GET,
    },
  });

export const getDocumentDetail = ({ id }) =>
  restApiCall({
    url: `${API_CONSTANTS.URL}/${API_CONSTANTS.PATH.DOCUMENTS}/${id}`,
    opts: {
      method: API_CONSTANTS.METHOD.GET,
    },
  });

export const addDocument = ({ body }) =>
  restApiCall({
    url: `${API_CONSTANTS.URL}/${API_CONSTANTS.PATH.DOCUMENTS}`,
    opts: {
      method: API_CONSTANTS.METHOD.POST,
      body: JSON.stringify(body),
    },
  });

export const deleteDocument = ({ id }) =>
  restApiCall({
    url: `${API_CONSTANTS.URL}/${API_CONSTANTS.PATH.DOCUMENTS}/${id}`,
    opts: {
      method: API_CONSTANTS.METHOD.DELETE,
    },
  });
