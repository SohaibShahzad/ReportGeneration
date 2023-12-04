import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const inputStyle =
    "w-full bg-[#f2f2f2] px-4 py-3 rounded-md rounded-md focus:outline-none focus:border-blue-500";

  const handleChange = (value, setter, field) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!message) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    // Here you would normally handle the submission, for example sending it to a server
    // For demonstration, I am just logging to console and showing a success toast
    console.log(formData);
    toast.success("Message sent successfully!");
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-70px)] md:h-[calc(100vh-250px)]">
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <h1 className="text-center text-[40px] md:text-[56px] my-2 md:my-12 font-extrabold">
        Contact Us
      </h1>
      <div>
        <form
          className="flex flex-col gap-2 md:gap-6 lg:gap-8 overflow-y-auto max-w-[600px] w-full"
          onSubmit={handleSubmit}
        >
          <span className="flex gap-2 md:gap-6 lg:gap-8">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                  handleChange(e.target.value, setFirstName, "firstName")
                }
                className={inputStyle}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs ml-2">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                  handleChange(e.target.value, setLastName, "lastName")
                }
                className={inputStyle}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs ml-2">{errors.lastName}</p>
              )}
            </div>
          </span>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e.target.value, setEmail, "email")}
              className={inputStyle}
            />
            {errors.email && (
              <p className="text-red-500 text-xs ml-2">{errors.email}</p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) =>
                handleChange(e.target.value, setMessage, "message")
              }
              className={`${inputStyle} h-48 resize-none`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs ml-2">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#266FD5] text-white text-[22px] tracking-[2px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
