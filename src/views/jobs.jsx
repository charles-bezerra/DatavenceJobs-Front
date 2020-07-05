import React, { useState, useEffect } from 'react';
import { 
    Nav, 
    Navbar, 
    Container, 
    Button, 
    Jumbotron 
} from 'react-bootstrap';

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

        <Jumbotron style={{ marginTop: "55px" }}>
            <h1>Bem Vindo!</h1>
            <p>
                Encontre as melhores vagas para sua carreira em nossa plataforma. 
                Além disso, estamos aqui para você e sua empresa, 
                encontrando os melhores e mais adequados profissionais para o seu negócio.
            </p>
            <p>
                <Button href="/login" className="shadow rounded-lg" variant="primary">Recrutador</Button>
                <Button className="ml-2 shadow rounded-lg" variant="success">Candidato</Button>
            </p>
        </Jumbotron>

        <Container>
            <h6 className="pt-4 text-uppercase">
                Vagas disponíveis
            </h6>

            <hr/>

            { content }
        </Container>
    </>
    );
}