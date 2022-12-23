import UserService from '../service/UserService';
import { useEffect } from 'react';
import AnalystView from '../analyst/AnalystView';
import React  from 'react';
function RenderForAuthenticate(){

    useEffect(()=>{
        UserService.initKeycloak();    
    },[]);

    return(
        <AnalystView/>
    );
}

export default RenderForAuthenticate;