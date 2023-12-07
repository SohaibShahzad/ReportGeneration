import { IoArrowBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { parseData } from "@/utils/parser";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CgRemove, CgAdd } from "react-icons/cg";
import Link from "next/link";

export const ParseTemplate = ({ template, onGoBack }) => {
  const [parsedElements, setParsedElements] = useState([]);
  const [editableVar, setEditableVar] = useState(null);
  const [editOptions, setEditOptions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const parsed = parseData(template);
    setParsedElements(parsed);
  }, [template]);

  const handleEditVariable = (variableName) => {
    const variable = parsedElements.find(
      (el) => el.type === "dropdown" && el.placeholder === variableName
    );
    if (variable) {
      setEditableVar(variable.placeholder);
      setEditOptions(variable.options);
    }
    onOpen();
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...editOptions];
    newOptions[index] = e.target.value;
    setEditOptions(newOptions);
  };

  const handleAddOption = () => {
    setEditOptions([...editOptions, ""]);
  };

  const handleSaveOptions = () => {
    // Filter out empty strings from editOptions
    const filteredOptions = editOptions.filter(
      (option) => option.trim() !== ""
    );

    const newParsedElements = parsedElements.map((el) => {
      if (el.type === "dropdown" && el.placeholder === editableVar) {
        return { ...el, options: filteredOptions };
      }
      return el;
    });

    setParsedElements(newParsedElements);
    setEditableVar(null);
    onClose();
  };

  const handleSubmit = () => {
    console.log("parsedElements", parsedElements);
  };

  const variableList = parsedElements
    .filter((el) => el.type === "dropdown")
    .map((el) => el.placeholder);

  const inputStyle =
    "w-full md:w-[600px] h-[250px] resize-none text-[20px] font-bold bg-[#f2f2f2] px-4 py-3 rounded-md border border-[#777777] overflow-y-auto scrollable-div";

  return (
    <>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        className="font-worksans"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3>Editing Options for "{editableVar}"</h3>
          </ModalHeader>
          <ModalBody>
            {editOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const newOptions = [...editOptions];
                    newOptions.splice(index, 1);
                    setEditOptions(newOptions);
                  }}
                >
                  <CgRemove className="w-5 h-5 text-red-500" />
                </button>
                <input
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  className="w-full font-light px-3 py-1 rounded-md bg-[#f2f2f2] mb-3"
                />
              </div>
            ))}
            <Button
              onClick={handleAddOption}
              color="success"
              className="flex text-white"
              startContent={<CgAdd className="w-6 h-6 text-white" />}
            >
              Add Option
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" radius="sm" onPress={handleSaveOptions}>
              Save Options
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <main className="font-worksans md:w-[600px] mx-auto flex flex-col items-center justify-center h-[calc(100vh-70px)] md:h-[calc(100vh-250px)]">
        <div className="space-y-4">
          <span className="flex items-start">
            <div className="relative">
              <button onClick={onGoBack} className="hidden md:flex">
                <IoArrowBackCircle className="w-9 h-9 mt-[3px] -ml-16" />
              </button>
              <div className="absolute right-8 top-20 bg-blue-50 rounded-md min-w-[250px] h-[305px] p-6">
                <h2 className="text-center ">Variables Editor</h2>
                <p>
                  Here's the list of all the variables used in the doc. Please
                  click any one to customize!!
                </p>
                <div className="overflow-y-auto h-[120px] my-4 scrollable-div">
                  {" "}
                  {variableList.map((varName, index) => (
                    <div key={index} className="my-2 ">
                      <button
                        onClick={() => handleEditVariable(varName)}
                        className="text-blue-500 hover:underline"
                      >
                        {varName}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h1 className="text-left text-[22px] md:text-[28px] font-worksans leading-tight">
              <button onClick={onGoBack} className="md:hidden">
                <IoArrowBackCircle className="w-9 h-9 -mb-[10px]" />
              </button>
              Your variables will now appear on the left side of your screen:
            </h1>
          </span>
          <div className="w-full text-left text-[13px] md:text-[18px]">
            <p>
              <strong>Step #2:</strong> your variables will auto-populate in the
              template document. They will also appear on the LEFT side of your
              screen, where you can add, remove, or edit the options as needed.
            </p>
          </div>

          <div className={inputStyle}>
            {parsedElements.map((element, index) =>
              element.type === "text" ? (
                <span key={index}>{element.value}</span>
              ) : (
                <select
                  key={index}
                  className="font-light px-3 py-1 rounded-md shadow mb-3"
                >
                  {element.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )
            )}
          </div>
          <Link
            href="/dashboard"
            className="bg-[#266FD5] text-white text-[14px] md:text-[18px] mt-10 w-full max-w-[600px] font-bold py-3 rounded-md hover:bg-[#1f5aad] duration-200"
          >
            Finish Practice!
          </Link>
        </div>
      </main>
    </>
  );
};
