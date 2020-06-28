import React from 'react';
import { Spinner } from 'react-bootstrap';

const ContentLoading = (props) => (
    <div 
        className="d-flex justify-content-center align-self-center align-items-center" 
        style={{ width: "100%", height: "80vh" }}>        
        <Spinner 
            size="lg"
            variant="primary" 
            animation="border"/>
    </div> 
);

export default ContentLoading;