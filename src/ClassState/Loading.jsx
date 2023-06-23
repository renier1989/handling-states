import React from 'react';

class Loading extends React.Component {

    componentWillUnmount(){
        // este se ejecura cuando el componente se va a desmontar
        console.log('componentWillUnmount');
    }

    render(){
        return (
            <div className='flex items-center justify-center text-indigo-500 font-medium'>
                <p>Cargando..(com)</p>
            </div>
        );
    }
}

export {Loading}