import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Input, Submit } from '../../components/input';
import "./login.css";

import api from '../../services/api';

export default function (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        const login = {
            email: email,
            password: password,
        }

        api
        .post("/user/login", login)
        .then( (response) => {
            const data = response.data;

            if (data.success) {
                setError(null);
                localStorage.setItem("user", JSON.stringify(data.t))
                window.location.reload()
            }
            else 
                setError(data.error);
        })
        .catch((error) => {
            alert("Error ao conectar a o api!");
        });
    }

    return(
    <div className="login">
    <Card className="shadow border-0 p-4" style={{ width: "350px" }}>
        <Form onSubmit={handleSubmit}>
            <center>
                <h4>Entrar</h4>
            </center>

            <hr/>

            <Input 
                required="required"
                type="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Seu email de acesso"
            />

            <Input 
                required="required"
                type="password"
                label="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Sua senha"
            />

            {
                (error === null) ? <></> : <Alert variant="danger">{error}</Alert>
            }

            <hr/>

            <Submit value="Entrar"/>    

            <Button className="mt-3" variant="link" block href="/register">
                Ainda não possuo conta.
            </Button>
        </Form>
    </Card>
    </div>
    );
}