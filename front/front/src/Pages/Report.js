import React, { Component,useState } from "react";
import Table from 'react-bootstrap/Table'
import {useNavigate} from "react-router-dom";
import {useReport} from "../hooks/useReport";

export default function Report() {
  const {report, isLoading, array, error} = useReport()
  const [value, setValue] = React.useState({
      month:
          {
              value: '',
          },
      year:
          {
              value: '',
          },
  });

function inputHandler(e){
    const {name,value} = e.target;
    setValue(prevalue=>({...prevalue,
      [name]:value
    }))
}


  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    await report(value.year, value.month);
  }

  return (
      <div>
    <form onSubmit={handleSubmit} >
      <h1>Report</h1>

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
      <button disabled={isLoading}>Submit</button>
        {
            error && <div className='error'>{error}</div>
        }
    </form>
          <br/>

    {array.length > 0 && (
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
                {array.map(user => ( user.sum != null ?
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
