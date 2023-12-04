import { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 8;
    let strength = 0;

    if (hasUpperCase) strength += 1;
    if (hasSpecialChar) strength += 1;
    if (hasMinimumLength) strength += 1;

    return strength;
  };

  const handleChange = (value, setter, field) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setSex("");
    setEmail("");
    setPassword("");
    setPasswordStrength("");
    setErrors({});
  };

  const handlePasswordChange = (e) => {
    setErrors({ ...errors, password: null });
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const progressBarColor = (strength) => {
    if (strength === 3) return "bg-green-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 1) return "bg-orange-500";
    return "bg-red-500";
  };

  const requirementStyle = (condition) =>
    `text-sm ${condition ? "text-green-500" : "text-gray-500"}`;

  const PasswordRequirements = () => (
    <div className="mt-2">
      <ul className="list-disc pl-5 space-y-1">
        <li className={requirementStyle(password.length >= 8)}>
          At least 8 characters
        </li>
        <li className={requirementStyle(/[A-Z]/.test(password))}>
          At least one uppercase letter
        </li>
        <li
          className={requirementStyle(/[!@#$%^&*(),.?":{}|<>]/.test(password))}
        >
          At least one special character
        </li>
      </ul>
    </div>
  );

  const validateFields = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!sex) newErrors.sex = "Please select your sex.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else {
      if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(password))
        newErrors.password += " Include an uppercase letter.";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        newErrors.password += " Include a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    const signupPromise = fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName, sex }),
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.message || "An error occurred during registration"
        );
      }
      return result;
    });

    toast
      .promise(signupPromise, {
        pending: "Signing you up...",
        success: {
          render({ data }) {
            return data.message || "Registered successfully! 👌";
          },
        },
        error: {
          render({ data }) {
            return data.message || "Failed to register. 🤯";
          },
        },
      })
      .then((result) => {
        console.log(result.message);
        resetForm();
      })
      .catch((error) => {
        resetForm();
        console.error("Registration error:", error);
      });
  };

  const inputStyle =
    "w-full bg-[#f2f2f2] px-4 py-3 rounded-md rounded-md focus:outline-none focus:border-blue-500";

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-70px)] md:h-[calc(100vh-250px)]">
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <h1 className="text-center text-[40px] md:text-[56px] my-2 md:my-12 font-extrabold">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 overflow-y-auto md:w-[600px]"
      >
        <div>
          <label className="ml-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) =>
              handleChange(e.target.value, setFirstName, "firstName")
            }
            placeholder="First Name"
            className={inputStyle}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs ml-2">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="ml-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) =>
              handleChange(e.target.value, setLastName, "lastName")
            }
            placeholder="Last Name"
            className={inputStyle}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs ml-2">{errors.lastName}</p>
          )}
        </div>
        <div>
          <label className="ml-2">Sex</label>
          <select
            name="sex"
            value={sex}
            onChange={(e) => handleChange(e.target.value, setSex, "sex")}
            className={`${inputStyle}`}
          >
            <option value="" disabled>
              Select Sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-red-500 text-xs ml-2">{errors.sex}</p>
          )}
        </div>
        <div>
          <label className="ml-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value, setEmail, "email")}
            className={inputStyle}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs ml-2">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="ml-2">Password</label>
          <span className="flex items-center gap-3 rounded-md bg-[#f2f2f2]">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className={inputStyle}
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
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs ml-2">{errors.password}</p>
          )}
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
            <div
              className={`h-2.5 rounded-full ${progressBarColor(
                passwordStrength
              )} transition-all ease-out duration-300`}
              style={{ width: `${(passwordStrength / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        <PasswordRequirements />
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-[#266FD5] text-white text-[22px] mt-4 w-[600px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
      >
        Create Account
      </button>
    </main>
  );
}
