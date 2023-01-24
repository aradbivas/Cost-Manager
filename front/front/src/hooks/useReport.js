import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useReport = () =>
{
    const[error, setError] = useState(null);
    const[array, setArray] = useState([])
    const [isLoading, setISLoading] = useState(null);
    const [total, setTotal] = useState(null)

    const { user} = useAuthContext();

    const getReports = async (year, month) =>
    {
        setISLoading(true);
        setError(null);
        setArray([]);
        if(user){
            const response = await  fetch("https://cost-manager.onrender.com/api/report/getreport/"+ year + '/' + month + '/',
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
                setArray(json.array);
                setTotal(json.total)
            }
        }
        else
        {
            setError("Please login!");
            return
        }

    }
    const deleteReport = async (reportId, year,month,category)=>
    {
        setISLoading(true);
        setError(null);
        if(user){
            const response = await fetch('https://cost-manager.onrender.com/api/report/deleteItem',
                {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify({itemId:reportId, year: year, month: month, category: category})
            })
            const json = await response.json();
            if(response.ok){
                setISLoading(false)

                let arr = [...array]
                arr = array.filter(r => r.reportId !== json.itemId);

                setArray(arr)
                setTotal(json.total)
                // const arr = array.filter(r => r.reportId !== json);
                // console.log(array.filter(r => r.reportId !== json))
                // setArray(array.filter(r => r.reportId !== json))

            }
            else {
                setISLoading(false);
                setError(json);
            }
        }
        else
        {
            setError("Please login!");
            return
        }

    }
    return {getReports, isLoading, error, array,setArray,deleteReport, total};
}