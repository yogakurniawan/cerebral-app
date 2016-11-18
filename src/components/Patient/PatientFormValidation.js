import {createValidator, required} from 'utils/validation';

const patientFormValidation = createValidator({
  firstname: [required],
  lastname: [required]
});
export default patientFormValidation;
