import { ValidationError } from 'yup';
import { toast } from 'react-toastify';

const DEFAULT_MESSAGE =
  'Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde.';

export default function (error: Error, message = DEFAULT_MESSAGE): void {
  if (error instanceof ValidationError) {
    toast(error.message, { type: 'error' });
  } else {
    toast(message, {
      type: 'error',
    });
  }
}
