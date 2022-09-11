import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () =>
{
    const[error, setError] = useState(null);
    const [isLoading, setISLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async (email, password) =>
    {
        setISLoading(true);
        setError(null);
        const response = await  fetch('/server/api/user/login/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({email, password})
            })
        const json = await  response.json();
        if(!response.ok)
        {
            setISLoading(false);
            setError(json.error);
        }
        if(response.ok)
        {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type: 'LOGIN', payload: json});
            setISLoading(false);


        }
    }
    return {login, isLoading, error};
}