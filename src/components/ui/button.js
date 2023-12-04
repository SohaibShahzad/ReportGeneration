export const Button = ({ title }) => {
  const handleClick = () => {
    console.log(title);
  };

  return (
    <button
      onClick={handleClick}
      className="flex bg-yellow-400 w-full justify-center py-2 rounded-md font-bold duration-200 hover:bg-yellow-500"
    >
      {title}
    </button>
  );
};
