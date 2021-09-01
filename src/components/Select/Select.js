const Select = (props) => {
  const options = props.options.map((element, index) => <option key={index}>{element}</option>);
  return (
    <>
      <h2>{props.title}</h2>
      <select onChange={props.onChange}>
        {options}
      </select>
    </>
  );
};

export default Select;