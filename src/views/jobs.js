import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Button, Form } from 'react-bootstrap';

import ContentLoading from '../components/contentLoading';
import ListJobs from '../components/listJobs.js';

import { api } from "../services/api";


const navLocal = (
<Navbar collapseOnSelect className="shadow" expand="lg" variant="dark" style={{ backgroundColor: "#2D2533" }}>
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
    <Button variant="light" size="sm" href="/login">Entrar como adm</Button>
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
      
    api
      .get("/job")
      .then( onResponse )
      .catch( (error) => {  
      
        setContent(errorJobs);
        console.log(error.message);
      
      });

    }, []);

  return (
    <>
      { navLocal }

      <Container>
        <h5 className="pt-4 text-uppercase font-smaller">
          Vagas disponíveis
        </h5>

        <hr/>

        { content }
      </Container>
    </>
  );
}