const RadioButton = (props) => {
  const options = props.options.map((element, index) => {
    return (
      <div key={index}>
        <input 
          type="radio" 
          id={element.value} 
          name={props.name}
          value={element.value} 
          onChange={props.onChange}
        />
        <label htmlFor={element.value}>{element.label}</label><br />
      </div>
    );
  });

  return (
    <>
      <h2>{props.title}</h2>
      {options}
    </>
  );
};

export default RadioButton;