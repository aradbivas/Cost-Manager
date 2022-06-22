import React, { Component,useState } from "react";
import Table from 'react-bootstrap/Table'
import {useNavigate} from "react-router-dom";

export default function Report() {
  const use_navigate=useNavigate();
  const [users, setUsers] = useState([])

  const [value, setValue] = React.useState({
    id: 
    {
    value: '',
},
month: 
{
value: '',
},
year: {
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
    var string ="server/8000/report/"+value.year+"/"+value.month+"/"+value.id;
    fetch(string,{'Content-Type': 'application/json'}).then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();

    }).then(data => setUsers(data)
    ).catch((error) => {
          console.log('error: ' + error);
          setUsers({noDataFound : "No data found"});
        });

  }

  return (
      <div>
    <form onSubmit={handleSubmit} >
      <h1>Report</h1>
      <label>
        User ID:
        <input
          name="id"
          type="number"
          required
          onChange={inputHandler}
           />
      </label>

      <label>
        Month:
        <input
          name="month"
          type="number"
          min='1'
          max='12'
          required
          onChange={inputHandler}
           />
      </label>
      <label>
        Year:
        <input
          name="year"
          type="number"
          max='2022'
          required
          onChange={inputHandler}
           />
      </label>
      <button >Submit</button>
      
    </form>
          <br/>

    {users.length > 0 && (
        <Table striped bordered hover size="sm" variant='dark'>
            <thead>
            <tr>
                <th>Description</th>
                <th>Sum</th>
                <th>Category</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
                {users.map(user => ( user.sum != null ?
                    <tr>
                    <td key={user.id}>{user.description}</td>
                    <td key={user.id}>{user.sum}</td>
                    <td key={user.id}>{user.category}</td>

                    </tr>
                    :
                    <tr>
                        <td colSpan={3}></td>
                        <td>{user.totalSum}</td>
                    </tr>))}

            </tbody>
        </Table>
      )}
    </div>
  );
}
