import React, { useState } from "react";
import "./Login.css";
import { Input, PrimaryButton } from "../../components";
import img from "../../assets/images/logo.png.webp";
import { validateEmail, validatePhone } from "../../components/Input/helper";
import { useUserRegistrationMutation } from "../../services/register.services";
import { userActions, userSlice } from "../../store/slices/user.slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRegistration] = useUserRegistrationMutation();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorEmail: "",
    errorPassword: "",
    errorConfirmPassword: "",
    phoneNumber: "",
    errorPhone: "",
    registrationError: "",
  };
  const [state, setState] = useState(initialState);
  console.log("here")
  const inputChangeHandler = (event, id) => {
    setState((prev) => {
      return {
        ...prev,
        [id]: event.target.value,
      };
    });
  };

  const emailValidator = () => {
    if (!validateEmail(state.email)) {
      setState((prev) => {
        return {
          ...prev,
          errorEmail: "Please enter valid email",
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          errorEmail: "",
        };
      });
    }
  };

  const phoneValidator = () => {
    if (!validatePhone(state.phoneNumber)) {
      setState((prev) => {
        return {
          ...prev,
          errorPhone: "Invalid Phone Number",
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          errorPhone: "",
        };
      });
    }
  };
  const passwordValidator = () => {
    if (state.password.length < 8) {
      setState((prev) => {
        return {
          ...prev,
          errorPassword: "Password must contain atleast 8 characters",
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          errorPassword: "",
        };
      });
    }
    if (state.password !== state.confirmPassword) {
      setState((prev) => {
        return {
          ...prev,
          errorConfirmPassword: "Password not matching",
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          errorConfirmPassword: "",
        };
      });
    }
  };

  const confirmPasswordValidator = () => {
    if (state.password !== state.confirmPassword) {
      setState((prev) => {
        return {
          ...prev,
          errorConfirmPassword: "Password not matching",
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          errorConfirmPassword: "",
        };
      });
    }
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const res = await userRegistration({
      name: state.name,
      email: state.email,
      password: state.password,
      phoneNumber: state.phoneNumber,
    });
    if (res.error) {
      setState((prev) => {
        return {
          ...prev,
          registrationError: "Something went wrong",
        };
      });
    }
    if (res.data?.user) {
      dispatch(userActions.addUser(res.data.user));
      sessionStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
  };

  const disabled =
    state.name === "" ||
    state.email === "" ||
    state.password === "" ||
    state.confirmPassword === "" ||
    state.errorEmail !== "" ||
    state.errorConfirmPassword !== "" ||
    state.errorPassword !== "";
  // console.log(disabled);

  return (
    <div className="card-container">
      <div className="login-inner-card">
        <div className="login-logo-header-card">
          <div className="logo">
            <img src={img} height="50px" />
          </div>
          <div className="title">
            <div className="login-text">
              <span>Signup</span>
            </div>
            <div className="desc-text">
              <span>Signup to your profile</span>
            </div>
          </div>
        </div>
        <div className="input-field">
          <Input
            id="name"
            type="text"
            value={state.name}
            name="Name"
            placeholder="Enter name"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="input-field">
          <Input
            id="phoneNumber"
            type="text"
            value={state.phoneNumber}
            name=" Phone Number"
            placeholder="Enter Phone Number"
            onChange={inputChangeHandler}
            onBlur={phoneValidator}
            errorMessage={state.errorPhone}
          />
        </div>
        <div className="input-field">
          <Input
            id="email"
            type="text"
            value={state.email}
            name="Email"
            placeholder="Enter email"
            onChange={inputChangeHandler}
            onBlur={emailValidator}
            errorMessage={state.errorEmail}
          />
        </div>
        <div className="input-field">
          <Input
            id="password"
            type="password"
            value={state.password}
            name="Password"
            placeholder="Enter Password"
            onChange={inputChangeHandler}
            onBlur={passwordValidator}
            errorMessage={state.errorPassword}
          />
        </div>
        <div className="input-field">
          <Input
            id="confirmPassword"
            type="password"
            value={state.confirmPassword}
            name=" Confirm Password"
            placeholder="Confirm Password"
            onChange={inputChangeHandler}
            onBlur={confirmPasswordValidator}
            errorMessage={state.errorConfirmPassword}
          />
        </div>
        <div className="submit-button">
          <div className="submit-button-alignment">
            <PrimaryButton
              name="Submit"
              onSubmitHandler={onSubmitHandler}
              disabled={disabled}
            />
          </div>
          <div className="error-message-text">
            <p>{state.registrationError}</p>
          </div>
          <div>
            <span className="already-have-account-text">
              Already have an Account? <Link to="/login" className="nav-link">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
