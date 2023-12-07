// parser.js

const defaultOptions = {
  DAY: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  EMOTION: ["Happy", "Sad", "Excited", "Anxious", "Calm"],
  ANIMAL: ["Cat", "Dog", "Bird", "Fish", "Horse"],
};

export const parseData = (templateString, customOptions = defaultOptions) => {
  if (typeof templateString !== "string" || templateString.length === 0) {
    return [];
  }

  const regex = /\[([A-Z0-9]+)\]/g;
  let match;
  let lastIndex = 0;
  let elements = [];

  while ((match = regex.exec(templateString)) !== null) {
    if (lastIndex !== match.index) {
      elements.push({
        type: "text",
        value: templateString.substring(lastIndex, match.index),
      });
    }

    const placeholder = match[1];
    elements.push({
      type: "dropdown",
      placeholder: placeholder,
      options: customOptions[placeholder] || [
        "Option 1",
        "Option 2",
        "Option 3",
      ],
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < templateString.length) {
    elements.push({ type: "text", value: templateString.substring(lastIndex) });
  }

  return elements;
};
