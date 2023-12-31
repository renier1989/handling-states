
import React from "react";
const SECURITY_CODE = 'colossus_1989';
function UseReducer({name}) {

    // AQUI CREAMOS UN ESTADO COMPUESTO Y ASI PODER CONTROLAR VARIOS ESTADOS , IMPORTANTE , AHORA TODOS LOS ESTADOS TIENE QUE EMPEZAR CON EL NOMBRE QUE LE ASIGNAMOS AL ESTADO COMPOUESTO POR EJEMPLO state.value .....
    // OTRA TEMA IMPORTANTE A TENER EN CUENTA ES QUE AHORA PARA LOS MODIFICADORES SE DEBE PASA TODO EL ESTADO Y LUEGO LO QUE REALMENTE QUEREMOS MODIFICAR, ESTO PARA EVITAR OMITIR ESTADOS EN LOS MODIFICADORES, POR EJEMPLOS setState(...state, estodo: modificacion)

    // const [state, setState] = React.useState({
    //     value : '',
    //     error: false,
    //     loading : false,
    //     deleted : false, // estado para pasar a la vista de eliminacion y pregunta por confirmacion
    //     confirmed : false, // esato para pasar a la visra de eliminacion correcta
    // });

    const [state, dispatch] = React.useReducer(reducer, initialState)

    // AQUI VAMOS A CAMBIAR A ALGO MAS DECLARATICO CON LOS ACTION CREATORS USAR LOS ACTIONTYPES
    const onConfirm = ()=>dispatch({type: actionTypes.confirm});
    const onError = ()=>dispatch({type: actionTypes.error});
    const onCheck= ()=>dispatch({type: actionTypes.check});
    const onDelete = ()=>dispatch({type: actionTypes.delete});
    const onBack= () => dispatch({type: actionTypes.back});
    const onRestart = () => dispatch({type: actionTypes.restart})

    const onWrite = (event)=>{
        dispatch({type: actionTypes.write, payload:event.target.value});
    }


    console.log(state);

    // const [error , setError] = React.useState(false);
    // const [loading , setLoading] = React.useState(false);
    // const [value , setValue] = React.useState('');

    // la estructura de los efecto se conforma de 2 parametros,
    // el primero es una funcion 
    // el segundo es la mas importante , es la que nos determina cuando se ejecutara la funcion
    // React.useEffect(()=>{}, []);
    React.useEffect(()=>{
        // comprobamos cuando el estado de loading sea realmente true para ejecutar la validacion 
        if(state.loading){
            // vamos a simular una carga de 3 segundos
            setTimeout(() => {
                if(state.value === SECURITY_CODE){
                    onConfirm();
                }else{
                    onError();
                }
                // setLoading(false);
            }, 3000);
        }
        
    }, [state.loading]);


    if(!state.deleted && !state.confirmed){ // qui mostramos la primera parte , donde la persona debe ingresar el codigo y verificar si esta bien escrito
        return (
            <div className='flex flex-col gap-2 bg-slate-200 py-4 px-4 rounded-sm outline outline-2 outline-gray-400'>
                <h2 className='text-2xl'>Eliminar {name}</h2>
                <p className='text-lg font-semibold'>Por favor, escribe el código de seguridad</p>
                {/* AQUI VALID SI HAY UN ERROR Y EL ESTADO DE CARGO ES FALSO */}
                {(state.error && !state.loading) && (
                    <p className="flex items-center justify-center text-red-500 font-medium">Error: El código es incorrecto</p>
                )}
                {state.loading && (
                    <p className="flex items-center justify-center text-indigo-500 font-medium">Comprobando código de seguridad. </p>
                )}
    
                <div className='flex flex-row gap-4 '>
                    <input value={state.value} onChange={onWrite} 
                    className="outline outline-2 outline-gray-400 p-1 rounded-sm" placeholder='Código de seguridad' />
                    {/* <button onClick={()=>setError(!error)} className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button> */}
                    <button 
                    onClick={onCheck} 
                    // onClick={()=>setLoading(!state.loading)} 
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button>
                </div>
            </div>
        );
    }else if(state.deleted && !state.confirmed){ // aqui muestro la vista para confirmar la eliminacion , por que el codigo que escribio fue correcto
        return(
            <div className='flex flex-col gap-2 bg-slate-200 py-4 px-4 rounded-sm outline outline-2 outline-gray-400'>
                <h2 className='text-2xl'>Eliminar {name}</h2>
                <p className='text-lg font-semibold'>Por favor, Confirme si realmente desea elminar este estado. ¿Segur@?</p>
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <button 
                    onClick={onDelete} 
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Si, Eliminar</button>
                    <button 
                    onClick={onBack} 
                    className='p-2 rounded-sm outline outline-2 outline-pink-600 hover:bg-pink-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-red-900 transition duration-200'>No, Volver</button>
                </div>
            </div>
        );
    }else { // aqui muestro la vista final de que se elimino con exito
        return(
            <div className='flex flex-col gap-2 bg-slate-200 py-4 px-4 rounded-sm outline outline-2 outline-gray-400'>
                {/* <h2 className='text-2xl'>Eliminar {name}</h2> */}
                <p className='text-2xl font-semibold'>Gracias por usar esta Aplicación</p>
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <button 
                    onClick={onRestart} 
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Iniciar todo</button>
                </div>
            </div>
        );
    }

}

const initialState = {
    value : '',
    error: false,
    loading : false,
    deleted : false, // estado para pasar a la vista de eliminacion y pregunta por confirmacion
    confirmed : false, // esato para pasar a la visra de eliminacion correcta
};

// NOTA: TODOS LOS REDUCES SIEMPRE VAN A ESPERAR 2 PARAMETROS (state, action) y el action tambien posee 2 parametros 
// el action.type y el action.payload

// FORMA DE CREAR REDUCERS CON CONDICIONALES IF (LA FOMRA MAS OBVIA Y SIMPLE DE USAR)
// const reducerIf = (state,action)=> {
//     if(action.type === 'ERROR'){
//         return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };
//     }else if(action.type == 'CHECK') {
//         return {
//             ...state,
//             loading: true
//         };
//     }else{
//         return {...state};
//     }
// }

// FORMA DE CREAR REDUCERS CON CONDICIONALES SWITCH (LA FORMA MAS COMUN DE USAR)

// const reducerSwitch = (state,action)=>{
//     switch(action.type){
//         case 'ERROR':
//             return {
//                 ...state,
//                 error:true,
//                 loading:false
//             };
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true
//             };
//         default: return {...state};
//     }
// }

// PODERMOS CREAR ACTIONTYPES PARA LA AYUDA DE DEFINIR LOS NOMBRES QUE USARAN LAS ACTIONS.
const actionTypes = {
    confirm : 'CONFIRM',
    error : 'ERROR',
    check: 'CHECK',
    delete : 'DELETE',
    write: 'WRITE',
    back: 'BACK',
    restart: 'RESTART',
}

// FORMA DE CREAR REDUCER CON OBJETOS , (FORMA ALTERNATIVA Y MAS ELEGANTE)
// en esta forma solo preguntamos por los estados, las encerramos en () para hacer un return directo 
const reducerObject = (state, payload)=>({
    [actionTypes.confirm]: {
        ...state,
        error:false,
        loading:false,
        deleted: true,
        confirm:false
    },
    [actionTypes.delete]: {
        ...state,
        confirmed:true
    },
    [actionTypes.write]:{
        ...state,
        value: payload
    },
    [actionTypes.error]: {
        ...state,
        error:true,
        loading:false
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.back]:{
        ...state,
        deleted: false,
        value: ''
    },
    [actionTypes.restart] : {
        ...state,
        confirmed:false,
        deleted: false,
        value: ''
    }
});

// AQUI SI VALIDAMOS SI ES QUE ALGUNO DE LOS ESTADOS REALMENTE EXISTE, 
// despues de validar de que el action.type si existen le poder pasar tanto el state como el action (especificamente el payload)
const reducer = (state, action)=>{
    if(reducerObject(state)[action.type]){
        return  reducerObject(state,action.payload)[action.type];
    }else {
        return state;
    }
}

export {UseReducer}