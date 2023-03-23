import React  from "react";
import JSONPretty from 'react-json-pretty';
const ManualVerifierView = () => {
    const storedResponse = sessionStorage.getItem('apiResponse');

return(
    <div className="container mt-3">
        <div className="row mx-auto">
            <div className="col-md-11 col-sm-10">
            <JSONPretty id="json-pretty" data={storedResponse}></JSONPretty>

            </div>
        </div>
    </div>)
}

export default ManualVerifierView;