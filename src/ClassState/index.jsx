import React from 'react';
import { Loading } from './Loading';
const SECURITY_CODE = 'colossus_1989';
class ClassState extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            value:'',
            error:false,
            loading :false,
        };
    }

    // aqui para simular los effectos en las clases de react, se usan los ciclos de vida.
    // aqui hay un aviso que nos dice que debemos renombrar la funcino de componentWillMount => UNSAFE_componenteWillMount
    // componentWillMount(){
    UNSAFE_componentWillMount(){
        // este se ejecuta primero 
        console.log('componentWillMount');
    }
    
    componentDidMount(){
        // este se ejecura segundo
        console.log('componentDidMount');
    }

    componentWillUnmount(){
        // este se ejecura cuando el componente se va a desmontar
        console.log('componentWillUnmount');
    }

    componentDidUpdate(){
        console.log('Actaualizacion');
        if(this.state.loading){
            // vamos a simular una carga de 3 segundos
            setTimeout(() => {
                console.log('Empezando la validacion');
                if(SECURITY_CODE === this.state.value){
                    this.setState({error:false,loading : false});
                }else{
                    this.setState({error:true, loading : false});
                }
                console.log('Terminando la validacion');
            }, 3000);
        }
    }

    render(){
        return (
            <div className='flex flex-col gap-2 bg-slate-200 py-4 px-4 rounded-sm outline outline-2 outline-gray-400'>
                <h2 className='text-2xl'>Eliminar {this.props.name}</h2>
                <p className='text-lg font-semibold'>Por favor, escribe el código de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p className="flex items-center justify-center text-red-500 font-medium">Error: El código es incorrecto</p>
                )}
                {this.state.loading && (
                    // <p className="flex items-center justify-center text-indigo-500 font-medium">Cargando....</p>
                    <Loading />
                )}
                <div className='flex flex-row gap-4'>
                    <input 
                    value={this.state.value}
                    onChange={(event)=>{
                        this.setState({value: event.target.value})
                    }}
                    className="outline outline-2 outline-gray-400 p-1 rounded-sm" placeholder='Código de seguridad' />
                    {/* <button 
                    onClick={()=> this.setState(prevState => ({error : !prevState.error}))}
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button> */}
                    <button 
                    onClick={()=> this.setState(prevState => ({loading : !prevState.loading}))}
                    className='p-2 rounded-sm outline outline-2 outline-green-600 hover:bg-green-700 hover:bg-opacity-70 hover:text-white font-semibold hover:outline-green-900 transition duration-200'>Comprobar</button>
                </div>
            </div>
        );
    }
}

export {ClassState}