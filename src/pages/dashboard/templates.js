import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
// import axios from "axios";
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import { IoChevronDown, IoAddCircle } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiFileWord2Fill } from "react-icons/ri";
import { GrOnedrive } from "react-icons/gr";
import { FaGoogleDrive } from "react-icons/fa6";
import { CreateNewComponent } from "@/components/templatesUpload/createNewComponent";
import { UploadDocComponent } from "@/components/templatesUpload/uploadDocComponent";
import { OneDriveComponent } from "@/components/templatesUpload/oneDriveComponent";
import { GoogleDriveComponent } from "@/components/templatesUpload/googleDriveComponent";

export default function Templates({ templatesProp }) {
  const [templates, setTemplates] = useState(templatesProp);
  const [chosenOption, setChosenOption] = useState("default");

  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");

  const inputStyle =
    "w-full h-full text-[20px] font-bold bg-[#f2f2f2] px-4 py-3 rounded-md focus:outline-none border border-[#777777] focus:border-blue-500";

  const handleSave = async () => {
    onClose();
    const userId = session.user.id;
    const newTemplate = {
      name: templateName,
      content: templateContent,
    };

    try {
      const saveResponse = await fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, template: newTemplate }),
      });

      if (saveResponse.ok) {
        console.log("Template saved successfully.");

        const fetchResponse = await fetch(`/api/template?userId=${userId}`, {
          method: "GET",
        });

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setTemplates(data.templates);
        } else {
          console.error("Error refetching templates.");
        }
      } else {
        console.error("Error saving template.");
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  const handleChange = (value, setter) => {
    setter(value);
  };

  const handleOptionSelect = (option) => {
    setChosenOption(option);
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
        return <CreateNewComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {templates.length > 0 ? (
            templates.map((template) => (
              <Card key={template._id} className="max-w-full mb-3 h-24">
                <CardBody>
                  <h1>{template.name}</h1>
                </CardBody>
              </Card>
            ))
          ) : (
            <Card
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
              isBlurred
            >
              <CardBody>
                <p>No templates found.</p>
              </CardBody>
            </Card>
          )}
        </div>
      )}
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
      templatesProp = data.templates;
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
