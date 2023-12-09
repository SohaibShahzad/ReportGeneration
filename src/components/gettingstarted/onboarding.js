import { useState } from "react";

export const Onboarding = ({ onCompletion, user }) => {
  const [industry, setIndustry] = useState("");
  const [templateCount, setTemplateCount] = useState("");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState({});

  const inputStyle =
    "w-full md:w-[600px] text-[12px] md:text-[14px] bg-[#f2f2f2] px-4 py-3 rounded-md rounded-md focus:outline-none focus:border-blue-500";

  const validateFields = () => {
    const newErrors = {};
    if (!industry) {
      newErrors.industry = "Industry is required.";
    }
    if (!templateCount) {
      newErrors.templateCount = "Template Count is required.";
    }
    if (!reference) {
      newErrors.reference = "Reference is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    console.log("industry", industry);
    console.log("templateCount", templateCount);
    console.log("reference", reference);

    onCompletion();
  };

  const handleChange = (value, setter, field) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <main className="md:w-[650px] mx-auto flex flex-col items-center justify-center h-[calc(100vh-70px)] md:h-[calc(100vh-130px)]">
      <h1 className="text-left text-[24px] md:text-[28px] font-worksans mb-6 md:mb-10">
        Welcome {user?.firstName}! Let's get you rolling!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start gap-4 md:gap-8 md:w-[600px] overflow-y-auto"
      >
        <div className="font-worksans space-y-1 md:space-y-3">
          <label className="md:ml-2 text-[14px] md:text-[16px] font-semibold">
            What industry are you in?
          </label>
          <select
            className={inputStyle}
            value={industry}
            name="industry"
            onChange={(e) =>
              handleChange(e.target.value, setIndustry, "industry")
            }
          >
            <option value="" disabled >
              Select Industry
            </option>
            <option value="healthcare">Healthcare</option>
            <option value="legal">Legal</option>
            <option value="education">Education</option>
            <option value="realestate">Real Estate</option>
          </select>
          {errors.industry && (
            <p className="text-red-500 text-xs ml-2">{errors.industry}</p>
          )}
        </div>
        <div className="font-worksans space-y-1 md:space-y-3">
          <label className="md:ml-2 text-[14px] md:text-[16px] font-semibold">
            How many template documents will you need to generate?
          </label>
          <select
            className={inputStyle}
            value={templateCount}
            name="templateCount"
            onChange={(e) =>
              handleChange(e.target.value, setTemplateCount, "templateCount")
            }
          >
            <option value="" disabled >
              Select Number of Templates
            </option>
            <option value="not sure">Not Sure</option>
            <option value="0-1">Just 1</option>
            <option value="2-10">2 - 10</option>
            <option value="11-25">11 - 25</option>
            <option value="25+">25+</option>
          </select>
          {errors.templateCount && (
            <p className="text-red-500 text-xs ml-2">{errors.templateCount}</p>
          )}
        </div>
        <div className="font-worksans space-y-1 md:space-y-3">
          <label className="md:ml-2 text-[14px] md:text-[16px] font-semibold">
            How did you hear about us?
          </label>
          <select
            className={inputStyle}
            value={reference}
            name="reference"
            onChange={(e) =>
              handleChange(e.target.value, setReference, "reference")
            }
          >
            <option value="" disabled >
              Select Reference
            </option>
            <option value="coworker">From a co-worker</option>
            <option value="google">
              Google Search (or other search engine)
            </option>
            <option value="customer">A DocNinja customer</option>
            <option value="other">Other</option>
          </select>
          {errors.reference && (
            <p className="text-red-500 text-xs ml-2">{errors.reference}</p>
          )}
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-[#266FD5] text-white text-[14px] md:text-[18px] mt-10 w-full max-w-[600px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
      >
        Upload you first template
      </button>
    </main>
  );
};
