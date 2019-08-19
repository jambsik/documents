export const DOCUMENT_TYPES = {
  ALL: 'all',
  SIMPLE: 'simple',
  CUSTOM: 'custom',
  ADVANCED: 'advanced',
};

const extractTypes = ({ ALL, ...rest }) => ({
  DOCUMENT_TYPES_LIST: Object.values({ ALL, ...rest }),
  DOCUMENT_TYPES_LIST_FOR_CREATE: Object.values(rest),
});
const TYPES = extractTypes(DOCUMENT_TYPES);

export const DOCUMENT_TYPES_LIST_FOR_CREATE =
  TYPES.DOCUMENT_TYPES_LIST_FOR_CREATE;
export const DOCUMENT_TYPES_LIST = TYPES.DOCUMENT_TYPES_LIST;

export const PAGINATION = {
  LIMIT: 5,
  DEFAULT_PAGE: 1,
};
