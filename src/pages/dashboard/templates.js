import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import { IoChevronDown, IoAddCircle } from "react-icons/io5";
import {
  MdKeyboardBackspace,
  MdOutlineDelete,
  MdOutlineModeEdit,
} from "react-icons/md";
import { RiFileWord2Fill } from "react-icons/ri";
import { GrOnedrive } from "react-icons/gr";
import { FaGoogleDrive } from "react-icons/fa6";
import { CreateNewComponent } from "@/components/templatesUpload/createNewComponent";
import { UploadDocComponent } from "@/components/templatesUpload/uploadDocComponent";
import { OneDriveComponent } from "@/components/templatesUpload/oneDriveComponent";
import { GoogleDriveComponent } from "@/components/templatesUpload/googleDriveComponent";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Templates({ templatesProp }) {
  const [templates, setTemplates] = useState(templatesProp);
  const [chosenTemplate, setChosenTemplate] = useState(null);
  const [chosenOption, setChosenOption] = useState("default");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`/api/template?userId=${session.user.id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setTemplates(data ? data.templates : []);
      } else {
        console.error(`Error fetching data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setChosenOption(option);
    setChosenTemplate(null);
  };

  const handleSaveTemplateSuccess = () => {
    fetchTemplates();
    setChosenOption("default");
    setChosenTemplate(null);
  };

  const handleSelectDelete = (template) => {
    onOpen();
    setChosenTemplate(template);
  };

  const handleSelectEdit = (template) => {
    setChosenTemplate(template);
    setChosenOption("create_new");
  };

  const handleDeleteTemplate = async () => {
    const savePromise = fetch("/api/template", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        templateId: chosenTemplate._id,
      }),
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.message || "An error occurred during template deletion"
        );
      }
      return result;
    });

    toast
      .promise(savePromise, {
        pending: "Deleting template...",
        success: {
          render() {
            const successMessage = "Template deleted successfully! 👌";
            return successMessage;
          },
        },
        error: {
          render({ data }) {
            return console.log(data.message) || "Failed to delete template. 🤯";
          },
        },
      })
      .then((result) => {
        setTemplates(result.templates);
      })
      .catch((error) => {
        console.error("Template delete error:", error);
      });

    onClose();
  };

  const renderComponent = () => {
    switch (chosenOption) {
      case "docx":
        return <UploadDocComponent />;
      case "one_drive":
        return <OneDriveComponent />;
      case "g_drive":
        return <GoogleDriveComponent />;
      case "create_new":
        return (
          <CreateNewComponent
            onSaveSuccess={handleSaveTemplateSuccess}
            templateData={chosenTemplate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 ">
      <ToastContainer autoClose={2000} theme="light" position="bottom-right" />
      <span className="flex items-center justify-between mb-4 gap-1">
        <h1 className="text-xl font-bold">Templates</h1>

        {chosenOption !== "default" ? (
          <Button
            variant="ghost"
            color="danger"
            size="sm"
            auto
            startContent={<MdKeyboardBackspace />}
            onClick={() => handleOptionSelect("default")}
          >
            Back
          </Button>
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="ghost"
                color="secondary"
                size="sm"
                auto
                startContent={<LuPlus />}
                endContent={<IoChevronDown />}
              >
                Create
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="docx"
                startContent={<RiFileWord2Fill />}
                onPress={() => handleOptionSelect("docx")}
              >
                Upload Doc
              </DropdownItem>
              <DropdownItem
                key="one_drive"
                startContent={<GrOnedrive />}
                onPress={() => handleOptionSelect("one_drive")}
              >
                One Drive
              </DropdownItem>
              <DropdownItem
                key="g_drive"
                startContent={<FaGoogleDrive />}
                onPress={() => handleOptionSelect("g_drive")}
              >
                Google Drive
              </DropdownItem>
              <DropdownItem
                key="create_new"
                startContent={<IoAddCircle />}
                onPress={() => handleOptionSelect("create_new")}
              >
                Create New
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </span>
      {chosenOption === "create_new" ? (
        renderComponent()
      ) : (
        <div className="max-h-[75vh] md:max-h-[80vh] overflow-y-auto p-4 rounded-md">
          {templates?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
              {templates.map((template) => (
                <Card
                  key={template._id}
                  className="border-none max-w-full mb-3"
                >
                  <CardHeader>
                    <h1 className="text-center">{template.name}</h1>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-center text-sm truncate">
                      {template.content}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex flex-col sm:flex-row justify-evenly gap-3 sm:gap-5 md:gap-2">
                    <Button
                      radius="sm"
                      color="warning"
                      variant="flat"
                      className="w-full sm:w-auto flex-grow"
                      startContent={<MdOutlineModeEdit className="h-5 w-5" />}
                      onPress={() => handleSelectEdit(template)}
                    >
                      Edit
                    </Button>
                    <Button
                      radius="sm"
                      color="danger"
                      variant="flat"
                      className="w-full sm:w-auto flex-grow"
                      startContent={<MdOutlineDelete className="h-5 w-5" />}
                      onPress={() => handleSelectDelete(template)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-44 text-[22px] sm:text-[26px] opacity-30 font-extrabold">
              <h1>No Templates Found</h1>
            </div>
          )}
        </div>
      )}
      <Modal backdrop="blur" placement="top" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Delete Template</ModalHeader>
          <ModalBody>
            <span>
              Are you sure you want to delete the template:{" "}
              <strong>{chosenTemplate?.name}</strong>?
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              radius="sm"
              variant="flat"
              onClick={() => handleDeleteTemplate()}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  let templatesProp = [];
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/template?userId=${session.user.id}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();

      templatesProp = data ? data.templates : null;
    } else {
      console.error(`Error fetching data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching templates:", error);
  }

  return {
    props: { templatesProp },
  };
}
