import React, { useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { API_HEADERS, API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom'

function ManualVerifier() {
  const [apiResponse, setApiResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);
  const storedResponse = sessionStorage.getItem('apiResponse');
  const navigate = useNavigate()
  const handleViewClick = () => {
    setLoading(true)
    if (storedResponse) {
      setApiResponse(JSON.parse(storedResponse));
      setTimeout(()=>{
        navigate(
            "/api/manual-verifier/view",{
        }
        )
      }, 2000)
      
    } else {
        fetch(API_URL, API_HEADERS)
    .then(response => {return response.json()})
    .then(data => {
    if (data.ResultCode === "200") {
        setApiResponse(data)
    sessionStorage.setItem('apiResponse', JSON.stringify(data,2, null));
    setTimeout(()=>{
        setLoading(false)
        navigate(
            "/api/manual-verifier/view",{
        }
        )
    }, 5000)
    }
    })
    .catch(error => {
        setError(error)
       setShowError(true)
       setLoading(false)
       setTimeout(()=>{
        setShowError(false)
       }, 5000)
    });
    };
    
  };

  const handleClearClick = () => {
    setApiResponse(null);
    setShowAlert(true);
    sessionStorage.removeItem('apiResponse');
    setTimeout(()=>{
        setShowAlert(false)
    }, 5000)
  };

  return (
    <div className='container  mt-3'>
        
        <div className='card p-2'>
            <>
            <Alert show={showAlert} variant='success' dismissible >
                JSON response was successfully cleared
            </Alert>

            </>
            <>
        <Alert dismissible show={showError} variant="danger">{
        error?.message}</Alert></>
            <h2 className='text-center'>
            A manual verifier API
            </h2>
            <ol>
                <li className='text-left'>
                <b>View:</b> On clicking on View, it should hit the API and redirect to a new page and displays the entire JSON response of the API. The response gets stored in the browser cookies/session and would remain until it is cleared or the browser is closed. 
On clicking of View button, if the response already exists in the browser, then the same is returned and displayed on a new page as earlier and no fresh API call is triggered, whereas an API call is triggered in the other case.

                </li>
                <li>
                <b>Clear: </b> This will clear the API response from the browser
                </li>
            </ol>
            <li>Note: Clear button was disabled when response not available</li>
        <div className='row '>
            <div className='col-md-6 col-sm-12 mx-auto'> 
            {
            loading ? <>
            <div className='row'>
                <div className='col-4 mx-auto'>
                <Spinner/>
                </div>
            </div>
            <div className='row'>
                <div className='col-6 mx-auto'>
                    Fetching from API
                </div>
            </div></>: 
            <div className='row gap-2'>
            <Button className='col-5' onClick={handleViewClick}>View</Button>
            <Button className='col-5' disabled={!storedResponse} onClick={handleClearClick}>Clear</Button>
            </div>
        }
            </div>
        </div>
        </div>

      
    </div>
  );
}

export default ManualVerifier;