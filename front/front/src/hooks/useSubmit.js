import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSubmit = () =>
{
    const[error, setError] = useState(null);
    const[message, setMessage] = useState(null)
    const [isLoading, setISLoading] = useState(null);
    const { user} = useAuthContext();

    const submit = async (category, description, sum) =>
    {
        setISLoading(true);
        setError(null);
        setMessage(null);
        if(user)
        {
            const response = await  fetch("https://cost-manager.onrender.com/api/report/addItem",
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`},
                    body:JSON.stringify({category, description, sum})
                })
            const json = await  response.json();
            if(!response.ok)
            {
                setISLoading(false);
                setError(json.error);
            }
            if(response.ok)
            {
                setISLoading(false);
                setMessage(json)
            }
        }
        else {
            setError("Please login!");
            return;
        }

    }
    return {submit, isLoading, error, message};
}