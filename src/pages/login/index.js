// login/index.js

import { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (value, setter, field) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateFields()) {
  //     return;
  //   }

  //   const result = await signIn("credentials", {
  //     redirect: false, // Prevent automatic redirect
  //     email,
  //     password,
  //   });

  //   if (result.error) {
  //     toast.error(result.error || "Login failed");
  //   } else {
  //     router.push("/dashboard");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
  
    // Wrap the signIn process in a promise
    const loginPromise = new Promise(async (resolve, reject) => {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect
        email,
        password,
      });
  
      if (result.error) {
        reject(result.error);
      } else {
        resolve("Login successful!");
      }
    });
  
    toast
      .promise(
        loginPromise,
        {
          pending: "Logging in...",
          success: "Logged in successfully! Redirecting...",
          error: "Login failed. Please check your credentials."
        },
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Handle any additional actions on login failure
      });
  };
  

  const inputStyle =
    "w-full bg-[#f2f2f2] px-4 py-3 rounded-md rounded-md focus:outline-none focus:border-blue-500";

  return (
    <main className="flex flex-col items-center justify-center overflow-y-auto h-[calc(100vh-150px)] md:h-[calc(100vh-250px)]">
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <h1 className="text-center text-[40px] md:text-[56px] my-2 md:my-12 font-extrabold">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 md:w-[600px]"
      >
        <div>
          <label className="ml-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value, setEmail, "email")}
            className={`${inputStyle} mt-2`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="ml-2">Password</label>
          <div className="flex items-center gap-3 mt-2 rounded-md bg-[#f2f2f2]">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                handleChange(e.target.value, setPassword, "password")
              }
              placeholder="Password"
              className={`${inputStyle} `}
            />
            {showPassword ? (
              <VscEyeClosed
                onClick={() => setShowPassword(false)}
                className="text-gray-500 cursor-pointer w-8 h-8 mr-3"
              />
            ) : (
              <VscEye
                onClick={() => setShowPassword(true)}
                className="text-gray-500 cursor-pointer w-8 h-8 mr-3"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#266FD5] text-white text-[22px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
        >
          Login
        </button>
      </form>
    </main>
  );
}
