import React, { useState, useEffect } from "react";
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
                                <span className="font-weight-bold para">
                                    Para: {address}
                                </span>
                                <span className="text-muted data">
                                    Data de envio: {new Date(createdAt).toLocaleString()}
                                </span>
                                <span className="conteudo">
                                    {content.substr(0, 40)}...
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
                <h1>Seja Bem-Vindo ao <br />
                    <span className="logo">Cupido Online</span>
                </h1>
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