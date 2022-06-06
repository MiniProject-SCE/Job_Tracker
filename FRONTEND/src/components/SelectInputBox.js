const SelectInputBox = ({
  title,
  type = "text",
  suggestion = "",
  value,
  data,
  textHandler,
}) => {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {title}
      </label>
      <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
        {data.map((value) =><option value = {value}>{value}</option>)}
      </select>
    </div>
  );
};

export default SelectInputBox;
