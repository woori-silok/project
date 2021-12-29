import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useLoginValidate = (
  email: string,
  password: string,
): Promise<boolean> => {
  return schema.isValid({
    email,
    password,
  });
};

export default useLoginValidate;
