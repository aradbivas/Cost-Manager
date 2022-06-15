import React, { Component } from "react";
import {useNavigate} from "react-router-dom";

export default function Submit() {
  const use_navigate=useNavigate();
  
  const [value, setValue] = React.useState({
    id: 
    {
    value: '',
},
sum: {
    value: '',
},
description: {
    value: '',
},
category: {
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
    const res=fetch("http://localhost:4030/submit",{
      method: 'POST',
      headers:{          
        'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        id: value.id,
        sum: value.sum,
        description: value.description,
        category: value.category,
    })}).then((res)=>{
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
      <h1>Add Item</h1>

      <label>
        ID:
        <input
          name="id"
          type="number"
          required 
          onChange={inputHandler}
          />
      </label>
      
      <label>
        Sum:
        <input
          name="sum"
          type="number"
          required
          onChange={inputHandler}
           />
      </label>

      <label>
      Description:
        <input
          name="description"
          type="text"
          required
          onChange={inputHandler}
           />
      </label>

      <label>
      Category:
        <input
          name="category"
          type="text"
          required
          onChange={inputHandler}
           />
      </label>
      <button >Submit</button>
    </form>
  );
}
