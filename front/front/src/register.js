import React from "react";
import {useNavigate} from "react-router-dom";


export default function Form() {
    const use_navigate = useNavigate();

    const [value, setValue] = React.useState({
        password:
            {
                value: '',
            },
        email:
            {
                value: '',
            },
        first_Name: {
            value: '',
        },
        Last_Name: {
            value: '',
        },

    });

    function inputHandler(e){
        const {name,value} = e.target;
        setValue(prevalue => ({...prevalue,
            [name]:value
        }))
    }



    const handleSubmit=(e)=>{
        e.preventDefault();
        const res=fetch("http://localhost:8000/register",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                password: value.password,
                email: value.email,
                firstName: value.first_Name,
                lastName: value.Last_Name,
            })}).then((res)=>{
            console.log(value.email);
            if(res.ok){
                use_navigate("/");
            }
            else{
                use_navigate("/register");
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1>Create Account</h1>

            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    required
                    onChange={inputHandler}
                />
            </label>
            <label>
                Email:
                <input
                    name="email"
                    type="text"
                    required
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

            <button >Submit</button>
        </form>
    );
}