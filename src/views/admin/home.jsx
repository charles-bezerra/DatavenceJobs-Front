import React, { useState, useEffect } from 'react';
import { 
    Nav, 
    Navbar, 
    Container, 
    Button, 
    Modal, 
    Form, 
    Alert,
    Card, 
} from 'react-bootstrap';

import ContentLoading from '../../components/contentLoading';
import ListApplieds from '../../components/listApplieds';
import { Input, Textarea } from '../../components/input';

import api from "../../services/api";


function NewJob(props) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [town, setTown] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        const newjob = {
            title: title,
            details: details,
            place: {
                town: town,
                state: state,
                country: country
            },
        };

        api
        .post("/job", newjob)
        .then( (response) => {
            alert("Vaga cadastrada com sucesso!");
            setError(null);  
            props.toggleShow();
        })
        .catch( (error) => {
            alert("Error ao conectar a api!");
            props.toggleShow();
        });
    }

    return (
        <>
        <Button size="sm" variant="outline-success" onClick={props.toggleShow}>
            Adicionar Vaga
        </Button>

        <Modal show={props.show} onHide={props.toggleShow}>
            <Form onSubmit={ handleSubmit }>
    
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar vaga
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <p>Vaga</p>
                    <Input 
                        required="required"
                        type="text" 
                        label="Titulo" 
                        value={title}
                        onChange={ (event) => setTitle(event.target.value) }
                        placeholder="titulo de destaque"/>
                    
                    <Textarea 
                        required="required"
                        type="text"
                        value={details}
                        rows={4} 
                        onChange={ (event) => setDetails(event.target.value) }
                        label="Detalhes" 
                        placeholder="detalhes da vaga"/>
                    

                    <p>Local</p>
                    <Input 
                        required="required"
                        type="text" 
                        label="Cidade" 
                        value={town}
                        onChange={ (event) => setTown(event.target.value) }
                        placeholder="cidade de execução"/>
                    
                    <Input 
                        required="required"
                        type="text" 
                        label="Estado"
                        value={state}
                        onChange={ (event) => setState(event.target.value) } 
                        placeholder="estado/distrito/provícia"/>
                    
                    <Input 
                        required="required"
                        type="text" 
                        label="País" 
                        value={country}
                        onChange={ (event) => setCountry(event.target.value) }
                        placeholder="país da vaga"/>

                {
                    (error === null) ? <></> : <Alert variant="danger">{error}</Alert>
                }
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.toggleShow}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" onClick={props.handleSubmit}>
                        Cadastrar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}


function logout() {
    localStorage.removeItem("user")
    window.location.reload();
}


const NavLocal = (props) => {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);

    return (
    <Navbar collapseOnSelect className="shadow" fixed="top" expand="lg" variant="dark" style={{ backgroundColor: "#2D2533" }}>
        <Navbar.Brand href="/home">Administrador</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>

            <Nav>    
                <NewJob show={ show } toggleShow={ toggleShow } />
                
                <Button className="ml-2" size="sm" onClick={logout} variant="outline-info">
                    Sair da conta
                </Button>
            </Nav>
        </Navbar.Collapse>

    </Navbar>
    );
} 


const emptyApplieds = (
    <p>Nenhuma aplicação realizada até o momento</p>
);


export default function (props) {
    const [content, setContent] = useState(<ContentLoading/>);
    const [amount, setAmount] = useState(0);

    function onResponse(response) {
        const applieds = response.data;
        setAmount(applieds.length);
        
        if (applieds.length > 0)
            setContent( <ListApplieds applieds={applieds}/> );
        else 
            setContent( emptyApplieds );
    }


    useEffect(() => {
        function getApplieds() {
            api
            .get("/applied")
            .then(onResponse)
            .catch((error) => {
                console.log(error);
            });
        }
        
        getApplieds();
        const interval = setInterval( getApplieds, 10000);

        return () => clearInterval(interval);

    }, []);

    return (
    <>
        <NavLocal/>
    
        <Container style={{ paddingTop: "80px" }}>
            <div className="d-flex justify-content-between align-items-center align-self-center">
                <h4><b>Candidaturas da plataforma</b></h4>

                <Card className="shadow-sm">
                    <Card.Body>
                        <b>Total: </b> { amount }
                    </Card.Body>
                </Card>
            </div>
            <hr/>
            {content}
        </Container>
    </>
    ); 
}   