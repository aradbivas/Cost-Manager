import React, {useEffect} from "react";
import {useReport} from "../hooks/useReport";
import ReportDetails from '../Components/ReportDetaiels'
export default function Report() {


    const {getReports, deleteReport,isLoading, array, error, total} = useReport()
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
        await getReports(value.year, value.month);
    }
    const handleDelete= async (reportId, category)=>{
        await deleteReport(reportId,value.year, value.month, category);
    }
    return (
        <div>
            <div className={array.length > 0 ? 'right' :'center'}>
                <form onSubmit={handleSubmit}>
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
                            required
                            onChange={inputHandler}
                        />
                    </label>
                    <button disabled={isLoading}>Submit</button>
                    {
                        error && <div className='error'>{error}</div>
                    }
                </form>
            </div>
            {array.length > 0 &&
                <div className='reports-left'>
                    {
                        array.map(report => {
                            if(report.totalForMonth === undefined)
                            {
                                if(report.category !== undefined)
                                {
                                    return <div className="workout-details2" key={report.reportId}>
                                        <ReportDetails  key={report.reportId} reportId= {report.reportId} category={report.category} description={report.description}
                                                        sum={report.sum} year={value.year} month={value.month} categoyTotal ={value.totalForCategory}/>
                                        <span className="span-delete" value={report.reportId} onClick={async ()=>await handleDelete(report.reportId, report.category)}>DELETE</span>
                                    </div>
                                }


                            }
                        })}
                    <div className='workout-details'>
                        <p><strong>Total for {value.month}/{value.year}: {total}$ </strong></p>

                    </div>


                </div>
            }
        </div>)



}
