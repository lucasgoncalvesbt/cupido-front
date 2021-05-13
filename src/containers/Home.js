import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home() {
    const [mensagens, setMensagens] = useState([]);
    const { isAuthenticated } = useAppContext();

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            try {
                const mensagens = await loadMensagens();
                setMensagens(mensagens);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [isAuthenticated]);

    function loadMensagens() {
        return API.get("mensagens", "/mensagens");
    }

    function renderMensagensList(mensagens) {
        return (
            <>
                <LinkContainer to="/mensagens/new">
                    <div className="mais">
                        <span className="button font-weight-bold">Enviar nova mensagem</span>
                    </div>
                </LinkContainer>

                <div className="cards">
                    {mensagens.map(({ mensagemId, content, address, createdAt }) => (
                        <LinkContainer key={mensagemId} to={`/mensagens/${mensagemId}`}>
                            <div className="card" action>
                                <span className="font-weight-bold">
                                    Para: {address}
                                </span>
                                <span>
                                    {content.substr(0, 100)}
                                </span>
                                <span className="text-muted">
                                    Data de envio: {new Date(createdAt).toLocaleString()}
                                </span>
                            </div>
                        </LinkContainer>
                    ))}
                </div>
            </>
        );
    }

    function renderLander() {
        return (
            <div className="lander container">
                <h1>
                    <span className="logo">Cupido Online</span>
                </h1>
                <p className="">Seja Bem Vindo, novo por aqui? Entenda como o site funciona.</p>
                <LinkContainer to="/instrucoes">
                    <span className="button">Instruções</span>
                </LinkContainer>
            </div>
        );
    }

    function renderNotes() {
        return (
            <div className="mensagens container">
                <h2>Suas Mensagens</h2>
                <div className="painel">{renderMensagensList(mensagens)}</div>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}