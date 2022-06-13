const InputBox = ({ title, type = "text", value, name, textHandler }) => {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {title}
      </label>
      {title === "Description" || title === "Address" || title === "About" ? (
        <textarea
          rows={5}
          value={value || ""}
          name={name}
          placeholder={title}
          onChange={textHandler}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize rounded-md"
        ></textarea>
      ) : (
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type={type}
          value={value || ""}
          name={name}
          placeholder={title}
          onChange={textHandler}
        />
      )}
      {name === "company" || title === "Title" || name === "name" || title === "Job Title"  ? (
        <p class="text-red-500 text-xs italic m-2">Please fill out this field.</p>
      ) : null}
    </div>
  );
};

export default InputBox;
