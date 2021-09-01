const InputText = (props) => {
  return (
    <>
      <h2>{props.title}</h2>
      <input type="text" onChange={props.onChange} />
    </>
  );
};

export default InputText;