import React from 'react';

class ClassState extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            error:false,
        };
    }

    render(){
        return (
            <div className='flex flex-col gap-2 bg-slate-200 py-4 px-4 rounded-sm outline outline-2 outline-gray-400'>
                <h2 className='text-2xl'>Eliminar {this.props.name}</h2>
                <p className='text-lg font-semibold'>Por favor, escribe el código de seguridad</p>
                {this.state.error && (
                    <p className="flex items-center justify-center text-red-500 font-medium">Error: El código es incorrecto</p>
                )}
                <div className='flex flex-row gap-4'>
                    <input className="outline outline-2 outline-gray-400 p-1 rounded-sm" placeholder='Código de seguridad' />
                    <button 
                    onClick={()=> this.setState(prevState => ({error : !prevState.error}))}
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button>
                </div>
            </div>
        );
    }
}

export {ClassState}