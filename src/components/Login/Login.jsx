import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [error, setError] = useState('')
    const emailRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setError('')


    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(!result.user.emailVerified){
            alert('please verify your email address')
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message)
      });
  };

  const handleForgetPassword = () =>{
    console.log('forget password', emailRef.current.value)
    sendPasswordResetEmail(auth, emailRef.current.value)
    .then(() =>{
        alert('please check your email')
    })
    .catch()
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  ref={emailRef}
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div onClick={handleForgetPassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button onSubmit={signInWithEmailAndPassword} className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
            {
                error && <p className="text-red-500">{error}</p>
            }
            <p>
              New to our website ? please{" "}
              <Link className="text-blue-400 underline" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
