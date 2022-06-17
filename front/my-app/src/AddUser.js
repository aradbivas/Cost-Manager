import React from "react";
import MaritalStatus from "./MaritalStatus";
import {useNavigate} from "react-router-dom";


export default function Form() {
    const [status, setStatus] = React.useState("");
    const use_navigate=useNavigate();

    const [value, setValue] = React.useState({
        id:
            {
                value: '',
            },
        first_Name: {
            value: '',
        },
        Last_Name: {
            value: '',
        },
        BirthDay: {
            value: '',
        },
    });

    function inputHandler(e){
        const {name,value} = e.target;
        setValue(prevalue=>({...prevalue,
            [name]:value
        }))
    }



    const handleSubmit=(e)=>{
        e.preventDefault();
        const res=fetch("http://localhost:4020/adduser",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                id: value.id,
                firstName: value.first_Name,
                lastName: value.Last_Name,
                BirthDay: value.BirthDay,
                maritalStatus: status,

            })}).then((res)=>{
            console.log("??");
            console.log(res);

            if(res.ok){
                use_navigate("/");
            }
            else{
                use_navigate("/register");
            }
        })

        console.log("fetch");
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1>Create Account</h1>

            <label>
                ID:
                <input
                    name="id"
                    type="number"
                    required
                    value={value.id}
                    onChange={inputHandler}
                />
            </label>

            <label>
                First Name:
                <input
                    name="first_Name"
                    type="text"
                    required
                    onChange={inputHandler}
                />
            </label>

            <label>
                Last Name:
                <input
                    name="Last_Name"
                    type="text"
                    required
                    onChange={inputHandler}
                />
            </label>

            <label>
                BirthDay:
                <input
                    name="BirthDay"
                    type="date"
                    max='2020-01-01'
                    required
                    onChange={inputHandler}
                />
            </label>
            <label>
                Marital Status:
                <select
                    name="maritalStatus"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    required>
                    <option key=""></option>
                    {MaritalStatus.map(status => (
                        <option key={status}>{status}</option>
                    ))}
                </select>
            </label>
            <button >Submit</button>
        </form>
    );
}
