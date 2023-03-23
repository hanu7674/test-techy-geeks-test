import React, { useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { API_HEADERS, API_URL } from "../../constants";

const Videos = () => {
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState([]);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);

    const fetchData = () =>{
        setLoading(true);
            fetch(API_URL, API_HEADERS)
    .then(response => {return response.json()})
    .then(data => {
    if (data.ResultCode === "200") {
        setApiResponse(data)
    sessionStorage.setItem('apiResponse', JSON.stringify(data,2, null));
    setTimeout(()=>{
        setLoading(false)
        setOpenVideoModal(true)
        
    }, 5000)
    }
    })
    .catch(error => {
        setLoading(false)
        setError(error)
       setShowError(true)
       setTimeout(()=>{
        setShowError(false)
       }, 5000)
    });
    }
    return(
        <div className="container mt-3">

            <Modal size="md" scrollable show={openVideoModal} onHide= {() => setOpenVideoModal(false)} >
                <Modal.Header closeButton>
                    Videos
                </Modal.Header>
                <Modal.Body>
                    {
                        apiResponse?.Data?.map((video)=>{
                            return(
                            <div key={video.id}>
                            <iframe height={240} width={460} src={video.videoUrl} title={video.id} allowFullScreen="allowfullscreen"></iframe>
                        </div>)
                        })
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        <div className="card p-2">
        <>
        <Alert dismissible show={showError} variant="danger">{
        error?.message}</Alert></>
        <h2 className='text-center'>
            A Video page
            </h2>
            <ol>
                <li className='text-left'>
                <b>Videos:</b>On click on videos, a medium sized modal containing horizontally scrollable videos (fetched from the API) should be displayed on the same page.
The videos can be played within the modal itself (no redirection to other website) with an option to view full screen as well.

                </li>
                
            </ol>
            {
            loading ? <>
            <div className='mx-auto'>
                <div className=' mx-auto'>
                <Spinner/>
                </div>
            </div>
            <div className='mx-auto'>
                <div className='mx-auto'>
                    Fetching from API
                </div>
            </div></>: 
            <div className='mx-auto'>
            <Button className="mx-auto" onClick={fetchData}>View videos</Button>
            </div>
        }
            </div>
        </div>
    )

}

export default Videos;