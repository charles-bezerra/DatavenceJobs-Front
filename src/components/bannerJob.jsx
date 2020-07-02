import React from 'react';
import { Nav, Container } from 'react-bootstrap';

import "./bannerJob.css";

const myNav = (
    <div className="d-flex flex-row justify-content-end">
        <Nav.Item>
            <Nav.Link className="text-link" href="#">A DATAVENCE</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link className="text-link" href="#">NOSSOS VALORES</Nav.Link>
        </Nav.Item>
        
        <button className="button shadow" onClick={ () => { window.location.href = "/jobs"; }  } href="#appleid">
            Vagas Abertas
        </button>
    </div>
);

export default function (props) {
    return (
    <>
        <div className="banner">
            <div className="banner-shadow"></div>

            <div className="banner-content p-4">
                <Container>
                    { myNav }

                    <div className="text-center" style={{ paddingTop: "100px" , }}>
                        <p className="text-location">
                            {props.place.town}/{props.place.state} - {props.place.country}
                        </p>
                        
                        <h1 className="text-white" style={{ fontWeight: "600" }}>
                            { props.title }
                        </h1>
                        
                        <button 
                            className="button shadow" 
                            onClick={ () => { window.location.href = "#form"; }  }
                            style={{ marginTop: "100px" }}>
                            Candidate-se
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    </>
    );
}