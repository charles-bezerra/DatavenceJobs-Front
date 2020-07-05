import React, { useState } from 'react';
import { Form, Toast } from 'react-bootstrap';
import { Input, Submit, Textarea, Select } from './input';
import api from '../services/api';
import stream from '../services/stream';


import "./formNewJob.css";

const styleH5 = { 
    paddingTop: "30px", 
    margin: "0", 
    paddingBottom: "0", 
    fontWeight: "600", 
    fontSize: "1.3rem" 
};

const H5 = (props) => (
    <center>
        <div style={ styleH5 }>
            { props.children }
        </div>
    </center>
);


function MySuccess(props) {
    return (
        <Toast show={props.show} onClose={props.toggleShow} style={{ position: "fixed", top: "16px" }}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">DatavenceJobs</strong>
                <small className="text-success">concluído</small>
            </Toast.Header>

            <Toast.Body>
                Parabéns! Sua candidatura foi cadastrada com sucesso.
            </Toast.Body>
        </Toast>
    );
}


export default function FormNewJob (props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [details, setDetails] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [english, setEnglish] = useState("");
    const [wage_claim, setWage_claim] = useState("");
    const [curriculum, setCurriculum] = useState(null);

    const [show, setShow] = useState(false);
    
    const toggleShow = () => setShow(!show);

    function submitApplied(url_curriculum) {
        const newApplied = {
            namedev: name,
            emaildev: email,
            phonedev: phone,
            details: details,
            url_github: github,
            url_linkedin: linkedin,
            wage_claim: wage_claim,
            english_level: english,
            url_curriculum: url_curriculum,
            job: props.job
        }

        api 
        .post(
            "/applied", 
            newApplied
        )
        .then( (response) => {
            toggleShow();
        })
        .catch( (error) => {
            console.log(error.response);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", curriculum);

        stream
            .post("/file", formData)    
            .then( (response) => {
                submitApplied(response.data);
            })
            .catch( (error) => {
                console.log(error);
                console.log("Error ao enviar o arquivo");
            });
    }

    return (
    <div className="form-new-job">
    <Form onSubmit={ handleSubmit }>

        <H5>Informações pessoais</H5>
    
        <Input 
            required="required"
            label="Nome Completo"
            name="fullname" 
            placeholder="Nome e Sobrenome"
            value={name}
            onChange={ (event) => setName(event.target.value) }
        />
    
        <Input
            required="required"
            label="E-MAIL" 
            name="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={ (event) => setEmail(event.target.value) }
        />
    
        <Input
            required="required"
            type="tel"
            label="Telefone (Com DDD)" 
            placeholder="(XX) XXXX-XXXX"
            value={phone}
            onChange={ (event) => setPhone(event.target.value) }
        />


        <H5>Carta de apresentação</H5>

        <Textarea
            rows={6}
            name="details" 
            label="Conte sua motivação (Opcional)" 
            placeholder="uma breve apresentação sobre você..."
            value={details}
            onChange={ (event) => setDetails(event.target.value) }
        />


        <H5>Ultimas perguntas</H5>

        <Input
            required="required"
            type="url"
            label="URL do seu Linkedin" 
            placeholder="https://linkedin.com/seu-userid"
            value={linkedin}
            onChange={ (event) => setLinkedin(event.target.value) }
        />
        
        <Input 
            required="required"
            type="url"
            label="URL do seu github" 
            placeholder="https://github.com/seu-username"
            value={github}
            onChange={ (event) => setGithub(event.target.value) }
        />

        <Select
            label="Qual seu nível de Inglês?"
            name="english-level"
            value={english}
            onChange={ (event) => setEnglish(event.target.value) }>
            <option value="">Escolha</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
        </Select>
        
        <Input
            required="required"
            type="number"
            label="Pretensão salarial" 
            placeholder="R$"
            value={wage_claim}
            onChange={ (event) => setWage_claim( event.target.value ) }
        />


        <H5>Anexe seu currículo em PDF ou DOC</H5>

        <Input
            required="required"
            type="file"
            accept=".pdf"
            label="Seu currículo" 
            placeholder="Adicione seu currículo"
            onChange={ (event) => setCurriculum( event.target.files[0] ) }
        />

        <hr/>
        <Submit value="Aplicar"/>

        <MySuccess 
            show={show} 
            toggleShow={toggleShow}/>
    </Form>
    </div>
    );
}
