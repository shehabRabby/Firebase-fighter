import React, { use, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { ClimbingBoxLoader } from 'react-spinners';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    // console.log(location)



    if(loading){
        return <div className='h-[97vh] flex items-center justify-center'>
            <ClimbingBoxLoader color='#e74c3c'></ClimbingBoxLoader>
        </div>
    }

    if(!user){
        return <Navigate to="/signin" state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;