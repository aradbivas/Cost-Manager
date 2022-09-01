import React, { Component,useState } from "react";
import Table from 'react-bootstrap/Table'
import {useNavigate} from "react-router-dom";
import {useReport} from "../hooks/useReport";
import ReportDetails from '../Components/ReportDetaiels'
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
  const [reports, setReports] = React.useState()

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
                  <th>Price</th>
                  <th>Category</th>
                  <th>Total</th>
              </tr>
              </thead>
              <tbody>
              {array.map(array => ( array.sum != null ?
                  <tr>
                      <td key={array.id}>{array.description}</td>
                      <td key={array.id}>{array.sum}</td>
                      <td key={array.id}>{array.category}</td>

                  </tr>
                  :
                  <tr>
                      <td colSpan={3}></td>
                      <td>{array.totalSum}</td>
                  </tr>))}

              </tbody>
          </Table>)}
      </div>
  );
}
