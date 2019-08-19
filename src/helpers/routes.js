import Home from '../pages/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import DocumentListPage from '../pages/Document/DocumentList.page';
import DocumentCreatePage from '../pages/Document/create/DocumentCreate.page';
import DocumentDetailPage from '../pages/Document/detail/DocumentDetail.page';

const BASE_URL = '/';

export const PATH_OF_ROUTES = {
  BASE_URL,
  DOCUMENTS: '/documents',
  CREATE_DOCUMENT: '/documents/create',
  DOCUMENTS_DETAIL: '/documents/:id',
};

export const routes = [
  {
    exact: true,
    path: PATH_OF_ROUTES.BASE_URL,
    component: Home,
  },
  {
    exact: true,
    path: PATH_OF_ROUTES.DOCUMENTS,
    component: DocumentListPage,
  },
  {
    exact: true,
    path: PATH_OF_ROUTES.CREATE_DOCUMENT,
    component: DocumentCreatePage,
  },
  {
    exact: true,
    path: PATH_OF_ROUTES.DOCUMENTS_DETAIL,
    component: DocumentDetailPage,
  },
  { component: NotFound },
];
