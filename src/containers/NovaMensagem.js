import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import "./NovaMensagem.css";

export default function NovaMensagem() {
    const history = useHistory();
    const [content, setContent] = useState("");
    const [address, setAddress] = useState("");

    function validateForm() {
        return content.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await enviarEmail({ content, address });
            await createMensagem({ content, address });
            history.push("/");
        } catch (e) {
            onError(e);
        }
    }

    function createMensagem(mensagem) {
        return API.post("mensagens", "/mensagens", {
            body: mensagem
        });
    }

    function enviarEmail(mensagem) {
        return API.post("mensagens", "/email", {
            body: mensagem
        });
    }

    return (
        <div className="NovaMensagem container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                    <Form.Label>Email do(a) Crush</Form.Label>
                    <Form.Control
                        className="input"
                        value={address}
                        type="email"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Mensagem</Form.Label>
                    <Form.Control
                        className="input"
                        value={content}
                        as="textarea"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Button
                    className="button"
                    block
                    type="submit"
                    size="lg"
                    variant="primary"
                    disabled={!validateForm()}
                >
                    Enviar
                </Button>
            </Form>
        </div>
    );
}