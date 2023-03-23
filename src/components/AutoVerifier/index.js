import React, { useState, useEffect } from 'react';
import { API_HEADERS, API_URL } from '../../constants';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function AutoVerifier() {
    const [apiStatus, setApiStatus] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(35);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);
  const navigate = useNavigate()

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeRemaining(time => time - 1);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
    
      useEffect(() => {
        if (timeRemaining === 0) {
          checkApiStatus();
          setTimeRemaining(35);
        }
      }, [timeRemaining]);
    
      useEffect(() => {
        checkApiStatus();
      }, []);
    
    const checkApiStatus = () => {
    setApiStatus('loading');
    fetch(API_URL, API_HEADERS)
    .then(response => response.json())
    .then(data => {
    if (data.ResultCode === "200") {
    setApiStatus('active');
    setResponseData(data)
    } else {
    setApiStatus('down');
    }
    })
    .catch(error => {
       setError(error)
       setShowError(true)
       setTimeout(()=>{
        setShowError(false)
       }, 5000)
    });
    };

  return (
    <div className='container mt-3'>
        <div className=' card p-2'> 
        <>
        <Alert dismissible show={showError} variant="danger">{
        error?.message}</Alert></>
        <h1 className='text-center'>Auto Verifier API Box</h1>
        <ol>
            <li><b>An auto verifier API box: </b>
             As soon as the page is loaded, an API call will be triggered that checks whether the API is up and running or not. Please use spinner/progress bar till we get response post initiation of the request.
If it is up (http status as 200), it shows the status as active and the no of items received in the Data object, and displays status as Down otherwise (http status other than 200).
The API is triggered after every 35 seconds and should also display time remaining for API hit. The timer should not be suspended if the browser tab is switched for some time. 

            </li>
        </ol>
        {apiStatus === 'loading' && 
      <>
      <div className='mx-auto'>
          <div className=' mx-auto'>
          <Spinner/>
          </div>
      </div>
      <div className='mx-auto'>
          <div className='mx-auto'>
              Fetching from API
          </div>
      </div></>
            }
        <div className='container-fluid m-4'>

      
        <>
          <p><b>API Status: {apiStatus === 'active' ? <span className='text-success'>Active</span>: <span className='text-danger'>API Down</span>}</b></p>
          {
            responseData ?
          <p><b>No. of items : {responseData?.Data?.length}</b></p> : null }
          <p><b>Time remaining for next API hit: {timeRemaining}</b></p>
        </>
    </div>        </div>

    </div>
  );
}


export default AutoVerifier;