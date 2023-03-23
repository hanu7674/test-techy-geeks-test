import React from "react";
import AutoVerifier from "../AutoVerifier";
import Footer from "../Footer";
import ManualVerifier from "../ManualVerifier";
import Videos from "../Videos";

const Home = () => {
    return(
        <>
        <div className="container mt-3 mb-5 ">
        <h1 className="text-center">Welcome to Techy Geeks</h1>
        {/* <div className="container-fluid">
            <div className="row m-3">
                <div className=" p-5 col-md-5 col-sm-10 card mx-auto">
                <p>Click <a href="/api/auto-verifier">here</a> to Auto Verify API.</p>
        <p>Click <a href="/api/manual-verifier">here</a> to Verify  API Manually.</p>

                </div>

            </div>
                </div> */}
        <AutoVerifier/>
        <ManualVerifier/>
        <Videos/>
        </div>
        <Footer/>

        </>
    )
}

export default Home;