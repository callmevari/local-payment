import { useState } from 'react'; // hook para agregarle estado a un componente
import Select from '../Select/Select';
import InputText from '../InputText/InputText';
import RadioButton from '../RadioButton/RadioButton';
import './Form.css';

// uso un array como storage
const db = [];

const Form = () => {
  const [state, setState] = useState({
    tipo_comida: 'Desayuno',
    comida_principal: '',
    comida_secundaria: '',
    bebida: '',
    ingirio_postre: 'no',
    postre: '',
    intencion_otro_alimento: 'no',
    alimento_queria_ingerir: '',
    se_quedo_con_hambre: 'no',
  });
  const [trago, setTrago] = useState(false);

  const selectHandler = (element) => {
    setState((prevState) => {
      const tipo_comida = element.target.value; // Desayuno, Almuerzo, Merienda, Cena
      const ingirio_postre = (tipo_comida === 'Desayuno' || tipo_comida === 'Merienda') ? 'no' : prevState.ingirio_postre;
      const postre = (ingirio_postre === 'no') ? '' : prevState.postre;
      return {
        ...prevState,
        tipo_comida: element.target.value,
        ingirio_postre,
        postre,
      };
    });
  };

  const IngirioPostreHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        ingirio_postre: element.target.value
      };
    });
  };

  const IntencionOtroAlimentoHandler = (element) => {
    setState((prevState) => {
      const intencion_otro_alimento = element.target.value;
      const alimento_queria_ingerir = (intencion_otro_alimento === 'no') ? '' : prevState.alimento_queria_ingerir;
      return {
        ...prevState,
        intencion_otro_alimento,
        alimento_queria_ingerir,
      };
    });
  };
  
  const comidaPrincipalHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        comida_principal: element.target.value
      };
    });
  };

  const comidaSecudariaHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        comida_secundaria: element.target.value
      };
    });
  };

  const bebidaHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        bebida: element.target.value
      };
    });
  };

  const postreHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        postre: element.target.value
      };
    });
  };

  const alimentoQueriaIngerirHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        alimento_queria_ingerir: element.target.value
      };
    });
  };

  const seQuedoConHambreHandler = (element) => {
    setState((prevState) => {
      return {
        ...prevState,
        se_quedo_con_hambre: element.target.value
      };
    });
  }

  const obtenerTrago = async () => {
    const trago = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await trago.json();
    const nombre = data.drinks[0].strDrink;
    const imagen = data.drinks[0].strDrinkThumb;
    setTrago({ nombre, imagen });
  };

  const guardarDatos = () => {
    const form = { ...state };
    const d = new Date();
    form.fecha = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    form.hora = `${d.getHours()}:${d.getMinutes()}`;
    db.push(form);
    alert('¡Formulario guardado con éxito!');
    console.log('Datos actuales guardados:');
    console.log(db);
    obtenerTrago();
  };

  return (trago === false) ? (
    <form>
      <Select 
        title="Tipo de comida diaria"
        options={['Desayuno', 'Almuerzo', 'Merienda', 'Cena']}
        onChange={selectHandler}
      />

      <InputText title="Comida principal" onChange={comidaPrincipalHandler} />
      <InputText title="Comida secundaria" onChange={comidaSecudariaHandler} />
      <InputText title="Bebida" onChange={bebidaHandler} />

      {(state.tipo_comida === 'Almuerzo' || state.tipo_comida === 'Cena') && (
        <RadioButton 
          title="¿Ingirio postre?"
          name="ingirio_postre"
          options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
          onChange={IngirioPostreHandler}
        />
      )}

      {(state.ingirio_postre === 'si') && <InputText title="Postre" onChange={postreHandler} />}     

      <RadioButton
        title="¿Tenía intención de ingerir otro alimento?"
        name="intencion_otro_alimento"
        options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
        onChange={IntencionOtroAlimentoHandler}
      />

      {(state.intencion_otro_alimento === 'si') && <InputText title="Alimento que quería ingerir" onChange={alimentoQueriaIngerirHandler} />}      

      <RadioButton 
        title="¿Se quedó con hambre?"
        name="quedo_con_hambre"
        options={[{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }]}
        onChange={seQuedoConHambreHandler}
      />

      <hr />
      <div className="button" onClick={guardarDatos}>Guardar</div>
    </form>
  ) : (
    <div className="trago">
      {trago.nombre}
      <img src={trago.imagen} alt="Imagen del trago" />
    </div>
  );
};

export default Form;