import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Input, { Submit } from './input';

const H5 = (props) => (
    <center>
        <div style={{ paddingTop: "40px",fontWeight: "600", fontSize: "1.3rem" }}>{ props.children }</div>
    </center>
);

export default function FormNewJob (props) {
    return (
    <div style={{ maxWidth: "28rem" }}>
    <Form>
        <H5>Informações Pessoais</H5>
        <Input 
            label="Nome Completo" 
            placeholder="Nome e Sobrenome"
            isCorrect={false}
        />
        <Input 
            label="E-MAIL" 
            placeholder="email@gmail.com"
            isCorrect={false}
        />

        
        <H5>Carta de apresentação</H5>
        <Input 
            label="Nome Completo" 
            placeholder="Seu nome completo"
            isCorrect={false}
        />


        <H5>Ultimas perguntas</H5>
        <Input 
            label="Nome Completo" 
            placeholder="Seu nome completo"
            isCorrect={false}
        />
        <Input 
            label="Nome Completo" 
            placeholder="Seu nome completo"
            isCorrect={false}
        />
        <Input 
            label="Nome Completo" 
            placeholder="Seu nome completo"
            isCorrect={false}
        />


        <Submit value="Aplicar"/>
    </Form>
    </div>
    );
}
