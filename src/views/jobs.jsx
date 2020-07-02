import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Button, Form } from 'react-bootstrap';

import ContentLoading from '../components/contentLoading';
import ListJobs from '../components/listJobs';

import api from "../services/api";

const navLocal = (
<Navbar collapseOnSelect className="shadow" fixed='top' expand="lg" variant="dark" style={{ backgroundColor: "#2D2533" }}>
    <Navbar.Brand href="/">Datavence Jobs</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>

        <Nav>
            <Nav.Link href="#" style={{ fontSize: "14px" }}>A DATAVENCE</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: "14px" }}>NOSSOS VALORES</Nav.Link>
        </Nav>
    </Navbar.Collapse>

    <Form inline className="px-3">
        <Button variant="success" size="sm" href="/login">ADMIN LOGIN</Button>
    </Form>
</Navbar>
);


const notFoundJobs = (<p>Nenhuma vaga disponível no momento.</p>);
const errorJobs = (<p>Error ao conectar com a API</p>);


export default function (props) {
    const [content, setContent] = useState(<ContentLoading />);

    function onResponse(response) {
        const jobs = response.data; 
        if (jobs.length > 0) 
            setContent( <ListJobs jobs={jobs} /> ); 
        else
            setContent( notFoundJobs );
    }


    useEffect(() => { 
        function getJobs() {      
            api
            .get("/job")
            .then( onResponse )
            .catch( (error) => {  
                setContent(errorJobs);
                console.log(error.message);
            });
        } 


        getJobs();
        const interval = setInterval( getJobs, 10000);
        return () => clearInterval(interval);
    
    }, []);


    return (
    <>
        { navLocal }

        <Container style={{ paddingTop: "70px" }}>
            <h4 className="pt-4 text-uppercase font-smaller">
                Vagas disponíveis
            </h4>

            <hr/>

            { content }
        </Container>
    </>
    );
}