import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import {useSubmit} from "../hooks/useSubmit";

export default function Submit() {
    const {submit, error, isLoading, message} = useSubmit();

    const [value, setValue] = React.useState({
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

const handleSubmit= async (e)=>
{
    e.preventDefault();
    await submit(value.category, value.description, value.sum);
}

  return (
    <form onSubmit={handleSubmit} >
      <h1>Add Item</h1>

      
      <label>
        Price:
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
      <button disabled={isLoading}>Submit</button>
        {
            error && <div className='error'>{error}</div>
        }
        {
            message && <div className='message'>{message}</div>
        }
    </form>
  );
}
