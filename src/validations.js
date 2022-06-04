import * as yup from "yup";

const signinValidations = yup.object().shape({
    email: yup.string().required("Burası zorunlu alandır!").email(),
    password: yup.string().required("Burası zorunlu alandır!")
});

const loginValidations = yup.object().shape({
    email: yup.string().required("Burası zorunlu alandır!").email(),
    password: yup.string().required("Burası zorunlu alandır!")
});

export { signinValidations, loginValidations};