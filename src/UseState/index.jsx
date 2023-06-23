import React from "react";
const SECURITY_CODE = 'colossus_1989';
function UseState({name}) {

    // AQUI CREAMOS UN ESTADO COMPUESTO Y ASI PODER CONTROLAR VARIOS ESTADOS , IMPORTANTE , AHORA TODOS LOS ESTADOS TIENE QUE EMPEZAR CON EL NOMBRE QUE LE ASIGNAMOS AL ESTADO COMPOUESTO POR EJEMPLO state.value .....
    // OTRA TEMA IMPORTANTE A TENER EN CUENTA ES QUE AHORA PARA LOS MODIFICADORES SE DEBE PASA TODO EL ESTADO Y LUEGO LO QUE REALMENTE QUEREMOS MODIFICAR, ESTO PARA EVITAR OMITIR ESTADOS EN LOS MODIFICADORES, POR EJEMPLOS setState(...state, estodo: modificacion)

    const [state, setState] = React.useState({
        value : '',
        error: false,
        loading : false,
        deleted : false, // estado para pasar a la vista de eliminacion y pregunta por confirmacion
        confirmed : false, // esato para pasar a la visra de eliminacion correcta
    });

    console.log(state);

    // const [error , setError] = React.useState(false);
    // const [loading , setLoading] = React.useState(false);
    // const [value , setValue] = React.useState('');

    // la estructura de los efecto se conforma de 2 parametros,
    // el primero es una funcion 
    // el segundo es la mas importante , es la que nos determina cuando se ejecutara la funcion
    // React.useEffect(()=>{}, []);
    React.useEffect(()=>{
        console.log('Empazando el Effect');

        // comprobamos cuando el estado de loading sea realmente true para ejecutar la validacion 
        if(state.loading){
            // vamos a simular una carga de 3 segundos
            
            setTimeout(() => {
                console.log('Empezando la validacion');
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error:false,
                        loading:false,
                        deleted: true,
                        confirm:false
                    });
                    
                }else{
                    setState({
                        ...state,
                        error:true,
                        loading:false
                    });

                }

                // setLoading(false);
                console.log('Terminando la validacion');
            }, 3000);
        }
        console.log('Terminando el Effect');
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
                    <input value={state.value} onChange={((event)=>{
                        setState({
                            ...state,
                            value: event.target.value
                        })
                        // setValue(event.target.value);
                    })} className="outline outline-2 outline-gray-400 p-1 rounded-sm" placeholder='Código de seguridad' />
                    {/* <button onClick={()=>setError(!error)} className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button> */}
                    <button 
                    onClick={()=>setState({
                        ...state,
                        loading: !state.loading
                    })} 
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
                    onClick={()=>setState({
                        ...state,
                        confirmed:true
                    })} 
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Si, Eliminar</button>
                    <button 
                    onClick={()=>setState({
                        ...state,
                        deleted: false,
                        value: ''
                    })} 
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
                    onClick={()=>setState({
                        ...state,
                        confirmed:false,
                        deleted: false,
                        value: ''
                    })} 
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Iniciar todo</button>
                </div>
            </div>
        );
    }

}

export {UseState}