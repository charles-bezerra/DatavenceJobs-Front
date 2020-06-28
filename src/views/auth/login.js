import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Input, Submit } from '../../components/input';
import "./login.css";

export default function (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit() {
        const login = {
            email: email,
            password: password,
        }


    }

    return(
    <div className="login">
    <Card className="shadow border-0 p-4" style={{ width: "350px" }}>
        <Form>
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

            <hr/>

            <Submit value="Entrar"/>    

            <Button className="pt-3" variant="link" size="sm" block href="/register">
                Registrar-se
            </Button>
        </Form>
    </Card>
    </div>
    );
}