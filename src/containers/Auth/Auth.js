import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as allActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const { building, authRedirectPath, onSetAuthRedirectPath } = props;
  
  useEffect(() => {
    if (building === false && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  //show error messages
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className="bg-danger">{props.error.message}</p>;
  }

  //redirect to home page after log-in **
  let authRedirect = null;
  if (props.isAuthenticated) {
    //user will go to checkout page after being authenticated
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}

      <form onSubmit={submitHandler}>
        <h6>{isSignUp ? "Create an account" : "Sign-in"}</h6>
        {form}
        {errorMessage}
        <Button btnType="Success">
          <h6>Submit</h6>
        </Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        <h6>{isSignUp ? "Signup" : "Login"}</h6>
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(allActions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) =>
      dispatch(allActions.setAuthRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
