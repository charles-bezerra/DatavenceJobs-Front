import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

import ContentLoading from '../../components/contentLoading';

import { api } from "../../services/api";

const navLocal = (
    <Navbar collapseOnSelect className="shadow" fixed="top" expand="lg" variant="dark" style={{ backgroundColor: "#2D2533" }}>
        <Navbar.Brand href="/">Datavence Jobs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>

            <Nav>
            <Nav.Link href="#" style={{ fontSize: "14px" }}>Sair</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);


const emptyApplieds = (
    <p>Nenhuma aplicação realizada até o momento</p>
);


export default function (props) {
    const [content, setContent] = useState(<ContentLoading/>);

    function onResponse(response) {
        const applieds = response.data;
        if (applieds.length > 0)
            console.log("Listar");
        else 
            setContent( emptyApplieds );
    }

    function getAppleids() {
        api
        .get("/applied")
        .then(onResponse)
        .catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        getAppleids();
    }, []);

    return (
    <>
        { navLocal }
    
        <Container className="pt-5">
            {content}
        </Container>
    </>
    ); 
}   