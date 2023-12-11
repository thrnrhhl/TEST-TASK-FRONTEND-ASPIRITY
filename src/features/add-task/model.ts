import * as Yup from 'yup';

export const initialValues = {
    description: ''
};

export const validationSchema = Yup.object().shape({
    description: Yup.string()
});

