import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useReport = () =>
{
    const[error, setError] = useState(null);
    const[array, setArray] = useState([])
    const [isLoading, setISLoading] = useState(null);
    const { user} = useAuthContext();

    const report = async (year, month) =>
    {
        setISLoading(true);
        setError(null);
        setArray([]);
        if(user){
            const response = await  fetch('server/api/report/getreport/' +year + '/' + month + '/',
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`},
                })
            const json = await  response.json();
            if(!response.ok)
            {
                setISLoading(false);
                setError(json);
            }
            if(response.ok)
            {
                setISLoading(false);
                    setArray(json);
            }
        }
        else
        {
            setError("Please login!");
            return
        }

    }
    return {report, isLoading, error, array};
}