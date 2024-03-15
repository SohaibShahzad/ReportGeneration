import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const CreateNewComponent = ({ onSaveSuccess, templateData }) => {
  const { data: session } = useSession();
  const [templateName, setTemplateName] = useState(
    templateData ? templateData.name : ""
  );
  const [templateContent, setTemplateContent] = useState(
    templateData ? templateData.content : ""
  );
  const [errors, setErrors] = useState({});

  const inputStyle =
    "w-full h-full text-[20px] bg-[#ffffff] px-4 py-3 rounded-md focus:outline-none border border-[#777777] focus:border-blue-500 placeholder:text-[16px]";

  const validateFields = () => {
    const newErrors = {};
    if (!templateName.trim())
      newErrors.templateName = "Template name is required";
    if (!templateContent.trim())
      newErrors.templateContent = "Template content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (value, setter, field) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    const userId = session.user.id;
    const newTemplate = {
      name: templateName,
      content: templateContent,
    };

    if (
      templateData &&
      templateData.name === newTemplate.name &&
      templateData.content === newTemplate.content
    ) {
      // No changes in template data, no need to save
      toast.success("Template data remains unchanged.");
      onSaveSuccess();
      return;
    }

    const savePromise = fetch("/api/template", {
      method: templateData ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: templateData
        ? JSON.stringify({
            userId,
            templateId: templateData._id,
            updatedTemplate: newTemplate,
          })
        : JSON.stringify({ userId, template: newTemplate }),
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.message || "An error occurred during template creation"
        );
      }
      return result;
    });

    toast
      .promise(savePromise, {
        pending: "Saving template...",
        success: {
          render() {
            const successMessage = templateData
              ? "Template updated successfully! 👌"
              : "Template saved successfully! 👌";

            onSaveSuccess();

            return successMessage;
          },
        },
        error: {
          render({ data }) {
            return console.log(data.message) || "Failed to save template. 🤯";
          },
        },
      })
      .then((result) => {
        setTemplateName("");
        setTemplateContent("");
      })
      .catch((error) => {
        console.error("Template save error:", error);
      });
  };

  return (
    <main>
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <p className="text-sm md:text-[17px]">Please fill the details below</p>
      <div className="border-1 my-3 w-[90%] mx-auto rounded-lg border-[#BDD4F5]" />
      <form onSubmit={handleSave} className="">
        <div>
          <label className="text-[18px] font-bold">Name</label>
          <input
            type="text"
            placeholder="Type here..."
            value={templateName}
            onChange={(e) =>
              handleChange(e.target.value, setTemplateName, "templateName")
            }
            className={inputStyle}
          />
          {errors.templateName && (
            <p className="text-red-500 text-xs my-1">{errors.templateName}</p>
          )}
        </div>
        <div className="my-3">
          <label className="text-[18px] font-bold">Content</label>
          <textarea
            placeholder="Type here..."
            value={templateContent}
            onChange={(e) =>
              handleChange(
                e.target.value,
                setTemplateContent,
                "templateContent"
              )
            }
            className={`${inputStyle} min-h-[200px] resize-none md:resize-y`}
          />
          {errors.templateContent && (
            <p className="text-red-500 text-xs ">{errors.templateContent}</p>
          )}
        </div>
        <Button onClick={handleSave} color="primary" radius="sm">
          {templateData ? "Update" : "Save"}
        </Button>
      </form>
    </main>
  );
};
