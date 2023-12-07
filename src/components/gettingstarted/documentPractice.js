import { IoArrowBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";

export const DocumentPractice = ({
  template,
  setTemplate,
  onGoBack,
  onCompletion,
}) => {
  const [templateDemo, setTemplateDemo] = useState(template);

  useEffect(() => {
    setTemplateDemo(template);
  }, [template]);

  const handleTemplateDemo = (e) => {
    setTemplateDemo(e.target.value);
    setTemplate(e.target.value);
  };

  const handleSubmit = () => {
    onCompletion(templateDemo);
  };

  const inputStyle =
    "w-full md:w-[600px] h-[200px] resize-none text-[20px] font-bold bg-[#f2f2f2] px-4 py-3 rounded-md focus:outline-none border border-[#777777] focus:border-blue-500";

  return (
    <main className="font-worksans md:w-[600px] mx-auto flex flex-col items-center justify-center h-[calc(100vh-70px)] md:h-[calc(100vh-250px)]">
      <div className="space-y-4">
        <span className="flex items-start">
          <button onClick={onGoBack} className="hidden md:flex">
            <IoArrowBackCircle className="w-9 h-9 mt-[3px] -ml-16" />
          </button>
          <h1 className="text-left text-[22px] md:text-[28px] font-worksans leading-tight">
            <button onClick={onGoBack} className="md:hidden">
              <IoArrowBackCircle className="w-9 h-9 -mb-[10px]" />
            </button>
            Now the fun part! Let's practice setting up a template document!
          </h1>
        </span>
        <div className="w-full text-left text-[13px] md:text-[18px]">
          <p>We'll show you a simple example to get you started.</p>
        </div>
        <div className="w-full text-left text-[13px] md:text-[18px]">
          <p>
            <strong>Step #1:</strong> upload your template as a Word document,
            Google Doc, or paste it in the space provided, making sure the
            variables are ALL CAPS, and contained inside brackets (only letters and numbers allowed).
          </p>
        </div>
        <textarea className={inputStyle} onChange={handleTemplateDemo}>
          {templateDemo}
        </textarea>
        <button
          onClick={handleSubmit}
          className="bg-[#266FD5] text-white text-[14px] md:text-[18px] mt-10 w-full max-w-[600px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
        >
          Next Step
        </button>
      </div>
    </main>
  );
};
