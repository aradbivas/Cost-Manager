import React from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useReport} from "../hooks/useReport";

const ReportDetails = (props) =>
{
    if(props.category !== undefined)
    {
        return  <div className='workout-details' key={props.reportId}>
                    <p><strong>Category: </strong>
                        {props.category}</p>
                    <p><strong>Description: </strong>{props.description}</p>
                    <p><strong>Price: </strong>{props.sum}</p>
            </div>
    }
    else {
        return
    }
}

export default ReportDetails;