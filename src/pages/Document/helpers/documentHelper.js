import React from 'react';
import PropTypes from 'prop-types';

import { DOCUMENT_TYPES } from './constants';
import Input from '../../../components/Input/Input.component';
import applicationTexts from '../../../helpers/applicationTexts';
import { toastr } from 'react-redux-toastr';

const fields = {
  title: 'title',
  text: 'text',
  image: 'image',
  date: 'date',
};
const rules = {
  [DOCUMENT_TYPES.SIMPLE]: [fields.title, fields.date],
  [DOCUMENT_TYPES.CUSTOM]: [fields.title, fields.date, fields.text],
  [DOCUMENT_TYPES.ADVANCED]: Object.values(fields),
};

export const isValidForm = (type, values) => {
  return values && rules[type].every(field => values[field]);
};

export const onSaveForm = (
  { documentSaveForm, documentFormValues, documentTypeToCreate },
  ev
) => {
  const isValid = isValidForm(documentTypeToCreate, documentFormValues);

  if (isValid) {
    ev.preventDefault();
    documentSaveForm({
      type: documentTypeToCreate,
      ...documentFormValues,
    });
  }
};

const readFile = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      toastr.error(applicationTexts.errors.errorImageNotBeAccessed);
  });

const onChangeForm = async (field, setForm, ev) => {
  let value = ev.target.value;

  if (ev.target.type === 'file') {
    value = await readFile(ev.target.files[0]);
  }

  setForm({
    field,
    value,
  });
};

export const createSimpleTemplate = ({ setForm, footer }) => (
  <form>
    <Input
      label={applicationTexts.documents.create.form.title}
      required
      onBlur={onChangeForm.bind(null, fields.title, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.date}
      required
      type="date"
      onBlur={onChangeForm.bind(null, fields.date, setForm)}
    />
    <div className="document-layout-form__card__footer">{footer()}</div>
  </form>
);

export const createCustomTemplate = ({ setForm, footer }) => (
  <form>
    <Input
      label={applicationTexts.documents.create.form.title}
      required
      onBlur={onChangeForm.bind(null, fields.title, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.text}
      required
      onBlur={onChangeForm.bind(null, fields.text, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.date}
      required
      type="date"
      onBlur={onChangeForm.bind(null, fields.date, setForm)}
    />
    <div className="document-layout-form__card__footer">{footer()}</div>
  </form>
);

export const createAdvanceTemplate = ({ setForm, footer }) => (
  <form>
    <Input
      label={applicationTexts.documents.create.form.title}
      required
      onBlur={onChangeForm.bind(null, fields.title, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.text}
      required
      onBlur={onChangeForm.bind(null, fields.text, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.image}
      required
      type="file"
      accept="image/x-png"
      onChange={onChangeForm.bind(null, fields.image, setForm)}
    />
    <Input
      label={applicationTexts.documents.create.form.date}
      required
      type="date"
      onBlur={onChangeForm.bind(null, fields.date, setForm)}
    />
    <div className="document-layout-form__card__footer">{footer()}</div>
  </form>
);

const propTypes = {
  footer: PropTypes.node.isRequired,
  setForm: PropTypes.func.isRequired,
};
createSimpleTemplate.propTypes = propTypes;
createCustomTemplate.propTypes = propTypes;
createAdvanceTemplate.propTypes = propTypes;
