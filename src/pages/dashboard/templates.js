import { getSession } from "next-auth/react";
import axios from "axios";
import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { LuPlus, LuWrapText, LuListChecks } from "react-icons/lu";
import { IoChevronDown, IoEnterOutline } from "react-icons/io5";
import {
  MdOutlineDragIndicator,
  MdOutlineTextFields,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";

const DraggableItem = ({ icon, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { name, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={`cursor-pointer hover:bg-[#DDDDDD] mb-4 p-3 rounded-md draggable-item ${
        isDragging ? "dragging" : ""
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          {icon}
          {name}
        </span>
        <MdOutlineDragIndicator className="w-6 h-6" />
      </span>
    </Card>
  );
};

// DropZone Component
const DropZone = ({ createdFields, setCreatedFields }) => {
  const [, drop] = useDrop({
    accept: "FIELD",
    drop: (item, monitor) => {
      if (!createdFields.find((field) => field.id === item.id)) {
        // Adding a new field to the createdFields
        setCreatedFields((prevFields) => [
          ...prevFields,
          { ...item, id: uniqueId() },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveField = (dragIndex, hoverIndex) => {
    const dragField = createdFields[dragIndex];
    const updatedFields = [...createdFields];
    updatedFields.splice(dragIndex, 1); // Remove the dragged item
    updatedFields.splice(hoverIndex, 0, dragField); // Insert it before the hovered item
    setCreatedFields(updatedFields);
  };

  const deleteField = (index) => {
    const updatedFields = [...createdFields];
    updatedFields.splice(index, 1);
    setCreatedFields(updatedFields);
  };

  return (
    <div ref={drop} className="drop-zone w-3/4 bg-gray-100 p-4">
      {createdFields.length > 0 ? (
        createdFields.map((field, index) => {
          console.log(field);
          if (!field.id) return null; // Skip rendering if 'id' is undefined
          return (
            <FormField
              key={field.id}
              field={field}
              index={index}
              moveField={moveField}
              deleteField={() => deleteField(index)}
            />
          );
        })
      ) : (
        <p className="text-center text-gray-500">
          Drag and drop elements here to build your form
        </p>
      )}
    </div>
  );
};

// FormField Component
const FormField = ({
  field,
  index,
  moveField,
  deleteField,
  setCreatedFields,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "FIELD",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: () => {
      return { id: field.id, index };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        setCreatedFields((prevFields) => {
          // Update the index of each field
          return prevFields.map((f, idx) => {
            if (f.id === item.id) {
              return { ...f, index: idx };
            }
            return f;
          });
        });
      }
    },
  });

  // Connect drag and drop refs
  drag(ref);
  drop(ref);

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="field-item"
    >
      {field.name}
      <button onClick={deleteField} className="delete-button">
        Delete
      </button>
      {/* ...other field rendering logic */}
    </div>
  );
};

const uniqueId = () => {
  return Math.random().toString(36);
};

export default function Templates({ templates }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createdFields, setCreatedFields] = useState([]);

  const draggableItems = [
    {
      icon: <LuWrapText className="w-5 h-5" />,
      name: "Long Question",
      type: "text",
    },
    {
      icon: <IoEnterOutline className="w-5 h-5" />,
      name: "Short Question",
      type: "short",
    },
    {
      icon: <LuListChecks className="w-5 h-5" />,
      name: "Multiple Choice",
      type: "multiple",
    },
    {
      icon: <MdOutlineRadioButtonChecked className="w-5 h-5" />,
      name: "Unique Choice",
      type: "unique",
    },
    // Add more items as needed
  ];
  const handleDrop = (item) => {
    // Ensure the dropped item has an 'id' property
    const newItemWithId = { ...item, id: item.id || uniqueId() };
    setCreatedFields((prevFields) => [...prevFields, newItemWithId]);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <span className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Templates</h1>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                variant="ghost"
                color="secondary"
                startContent={<LuPlus />}
                endContent={<IoChevronDown />}
              >
                Add New Template
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="upload_pdf"> Upload PDF</DropdownItem>
              <DropdownItem key="create_new" onPress={onOpen}>
                Create New
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
        <div>
          {templates.length > 0 ? (
            templates.map((template) => (
              <Card key={template._id} className="max-w-[400px] mb-4">
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

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
          <ModalHeader>Create New Template</ModalHeader>
          <ModalContent>
            <ModalBody className="flex flex-row">
              <div className="draggable-items w-1/4 p-4">
                <p className="text-center text-[18px] pb-4">Elements</p>
                {draggableItems.map((item, index) => (
                  <DraggableItem
                    key={index}
                    icon={item.icon}
                    name={item.name}
                    type={item.type}
                  />
                ))}
              </div>
              <div className="form-area w-3/4 p-4 bg-white flex justify-center">
                <DropZone
                  onDrop={handleDrop}
                  createdFields={createdFields}
                  setCreatedFields={setCreatedFields}
                />{" "}
                {/* Here you can add form elements based on createdFields */}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  console.log(createdFields);
                }}
              >
                Create Template
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </DndProvider>
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

  // Fetch templates for the logged-in doctor
  let templates = [];
  try {
    const response = await axios.get(
      `/api/templates?doctorId=${session.user.id}`
    );
    templates = response.data.templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
  }

  return {
    props: { templates },
  };
}
