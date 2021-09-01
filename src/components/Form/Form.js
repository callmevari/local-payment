import { useState } from 'react';
import Select from '../Select/Select';
import InputText from '../InputText/InputText';
import RadioButton from '../RadioButton/RadioButton';
import './Form.css';

const Form = () => {
  // const [state, setState] = useState({
  //   pregunta_1: 'Desayuno'
  // });

  const selectHandler = (element) => console.log(element.target.value);

  return (
    <form>

      <Select 
        title="Tipo de comida diaria"
        options={['Desayuno', 'Almuerzo', 'Merienda', 'Cena']}
        onChange={selectHandler}
      />

      <InputText title="Comida principal" />
      <InputText title="Comida secundaria" />
      <InputText title="Bebida" />

      {/* Solo se muestra si la rta de la preg 1 es opción 1 (Almuerzo) o 3 (Cena) */}
      <RadioButton 
        title="¿Ingirio postre?"
        name="ingirio_postre"
        options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
      />

      <InputText title="Postre" />      

      <RadioButton 
        title="¿Tenía intención de ingerir otro alimento?"
        name="intencion_otro_alimento"
        options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
      />

      <InputText title="Alimento que quería ingerir" />      

      <RadioButton 
        title="¿Se quedó con hambre?"
        name="quedo_con_hambre"
        options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
      />

      <hr />
      <button>Guardar</button>
    </form>
  );
};

export default Form;