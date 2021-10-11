import { Redirect, Route } from 'react-router-dom';

function AuthRoute(props:any){
    const {isAuthUser} = props
    if(isAuthUser === true) return <Redirect {...props} /> 
    return <Route {...props} />
}

export default AuthRoute