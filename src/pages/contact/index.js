import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const inputStyle = "bg-[#f2f2f2] px-6 py-3 rounded-md w-full";

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <section
      className="flex flex-col items-center justify-center overflow-y-auto"
      style={{ height: "calc(100vh - 250px)" }}
    >
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <h1 className="text-center text-[56px] my-12 font-extrabold">
        Contact Us
      </h1>
      <div>
        <form className="flex flex-col gap-8 w-[600px]" onSubmit={handleSubmit}>
          <span className="flex gap-8">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputStyle}
            />
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputStyle} h-48 resize-none`}
          />
          <button
            type="submit"
            className="bg-[#266FD5] text-white text-[22px] tracking-[2px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
