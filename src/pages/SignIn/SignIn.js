import React, { useState } from "react";
import "./SignIn.css";
import img from "../../assets/images/logo.png.webp";
import { Input, PrimaryButton } from "../../components";
import { validatePhone } from "../../components/Input/helper";
import { useUserLoginMutation } from "../../services/register.services";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const[userLogin] = useUserLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const initialState = {
    phoneNumber: "",
    password: "",
    errorPhone: "",
    errorPassword: "",
    loginError:""
  };
  const [state, setState] = useState(initialState);
  const inputChangeHandler = (event, id) => {
    setState((prev) => {
      return {
        ...prev,
        [id]: event.target.value,
      };
    });
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

  const onLoginHandler = async(event) => {
    event.preventDefault();
    const res = await userLogin({
        phoneNumber: state.phoneNumber,
        password:state.password
    })
    console.log(state.password)
    console.log(state.phoneNumber)
    if(res.error){
        setState((prev)=>{
            return{
                ...prev,
                loginError:"Something went wrong"
            }
        })
    }
    if(res?.data.user){
        dispatch(userActions.addUser(res.data.user))
        sessionStorage.setItem("token", res.data.token)
        navigate("/dashboard")
    }
  };
  const disabled =
    state.phoneNumber === "" ||
    state.password === "" ||
    state.errorPhone !== "" ||
    state.errorPassword !== "";
    // console.log(disabled)
  return (
    <div className="signin-card-container">
      <div className="login-logo-inner-div">
        <div className="login-logo-header-div-container">
          <div className="logo-div-container">
            <img src={img} height="50px" />
          </div>
          <div className="title-div-container">
            <div className="login-text-div-container">
              <span>Login</span>
            </div>
            <div className="login-desc-div-container">
              <span>Login to your profile</span>
            </div>
          </div>
        </div>
        <div className="input-field-div-container">
          <Input
            id="phoneNumber"
            value={state.phoneNumber}
            name="Phone Number"
            placeholder="Enter name"
            type="text"
            onChange={inputChangeHandler}
            onBlur={phoneValidator}
            errorMessage={state.errorPhone}
          />
        </div>
        <div className="input-field-div-container">
          <Input
            id="password"
            value={state.password}
            name="Password"
            placeholder="Enter Password"
            type="password"
            onChange={inputChangeHandler}
            onBlur={passwordValidator}
            errorMessage={state.errorPassword}
          />
        </div>
        <div className="submit-button-div-container">
          <div className="submit-button-alignment-div-container">
            <PrimaryButton
              onSubmitHandler={onLoginHandler}
              name="Login"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
