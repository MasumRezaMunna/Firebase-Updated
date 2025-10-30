import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    console.log("register click", email, password, terms, name, photo);

    const length6Pattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const specialCharPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    if (!length6Pattern.test(password)) {
      console.log("password did not match");
      setError("password must be 6 character or longer");
      return;
    } else if (!casePattern.test(password)) {
      setError(
        "password must have at least one uppercase and one lower case character"
      );
      return;
    } else if (!specialCharPattern.test(password)) {
      setError(
        "password must contain at least one special character (e.g. ! @ # $ % ^ & *)."
      );
      return;
    }

    setError("");
    setSuccess(false);

    if(!terms){
        setError('please accept our terms and condition');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("after creation of a new user", result.user);
        setSuccess(true);
        event.target.reset();

        // update user profile
        const profile = {
          displayName: name,
          photoURL: photo
        }
        updateProfile(result.user, profile)
        .then(() =>{})
        .catch()


        sendEmailVerification(result.user)
        .then(() => {
            alert('please login to your email and verify your email address')
        })
      })
      .catch((error) => {
        console.log("error happened", error);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">

                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your Name"
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />
                
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs top-2 right-5 absolute"
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                </div>
                <div>
                  <label class="label">
                    <input type="checkbox" 
                    name="terms"
                    class="checkbox" />
                    Accept Our Terms and Conditions
                  </label>
                </div>
                
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account created successfully!</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>Already have an account? Please <Link className="text-blue-400 underline" to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
