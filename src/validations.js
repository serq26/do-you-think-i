import * as yup from "yup";

const signinValidations = yup.object().shape({
  email: yup.string().required("Please enter your email").email(),
  password: yup.string().required("Please enter your password"),
  password_confirm: yup
    .string()
    .required("Please enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginValidations = yup.object().shape({
  email: yup.string().required("Please enter your email").email(),
  password: yup.string().required("Please enter your password"),
});

const accountValidations = yup.object().shape({
  email: yup.string().required("Please enter your email").email(),
  name: yup.string().required("Please enter your name"),
  surname: yup.string().required("Please enter your surname")
});

export { signinValidations, loginValidations, accountValidations };
