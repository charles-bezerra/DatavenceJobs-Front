import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import stream from "../services/stream";
 

function DetailsModal (props) {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);

    return (
        <>
        <Button 
            variant="primary mr-2" 
            className="border-0 shadow-sm"
            onClick={toggleShow}
            style={{ backgroundColor: "#2D2533" }}>
            Carta de apresentação
        </Button>
        
        <Modal show={show} onHide={toggleShow}>    
            <Modal.Header closeButton>
                <Modal.Title>Carta de apresentação</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p className="text-justify">{ props.text }</p>
            </Modal.Body>
                
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleShow}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}


const AppliedCard = (props) => (
    <Card className="shadow-sm rounded-lg my-4">
        <Card.Body> 
            <h3 style={{ color: "#2D2533" }}>{ props.namedev }</h3>
            
            <hr/>

            <p><b>Email: </b>{props.emaildev}</p>
            <p><b>Telefone: </b>{props.phonedev}</p>
            <p><b>Nível de inglês: </b><a href={props.englesh_level}>{props.english_level}</a></p>
            <p><b>Github: </b><a href={props.url_github}>{props.url_github}</a></p>
            <p><b>Linkedin: </b><a href={props.url_linkedin}>{props.url_linkedin}</a></p>
            <p><b>Pretenção salárial: </b>R$ {props.wage_claim}</p>

            <hr/>
                <p><b>Vaga: </b>{ (props.job) ? props.job.title : <>Desconhecido</>}</p>
            <hr/>
            
            <DetailsModal text={props.details}/>

            <Button
                download 
                href={ props.url_curriculum }
                target="_blank"
                className="shadow-sm border-0"
                variant="success">
                Baixar currículo
            </Button>
        </Card.Body>
    </Card>
);

export default function (props) {
    return (
    <>
    {
        props.applieds.map(
            (e,i) => <AppliedCard key={`appleids-list-item-${i}`} {...e}/>
        )
    }
    </>
    );
}