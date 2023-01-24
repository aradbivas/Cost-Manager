import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () =>
{
    const[error, setError] = useState(null);
    const [isLoading, setISLoading] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async (email, password) =>
    {
        setISLoading(true);
        setError(null);
        const response = await  fetch('https://cost-manager.onrender.com/api/user/register/',
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
    return {signup, isLoading, error};
}