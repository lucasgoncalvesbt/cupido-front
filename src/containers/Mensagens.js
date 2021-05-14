import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import "./Mensagens.css";

export default function Notes() {
    const { id } = useParams();
    const [mensagem, setMensagem] = useState(null);
    const [content, setContent] = useState("");
    const [address, setAddress] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    useEffect(() => {
        function loadNote() {
            return API.get("mensagens", `/mensagens/${id}`);
        }

        async function onLoad() {
            try {
                const mensagem = await loadNote();
                const { content, address, createdAt } = mensagem;


                setContent(content);
                setAddress(address);
                setCreatedAt(createdAt);
                setMensagem(mensagem);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    return (
        <div className="Mensagens">
            {mensagem && (
                <div className="mensagem container">
                    <h4>Mensagem para {address}</h4>
                    <span className="text-muted data">
                        Data de envio: {new Date(createdAt).toLocaleString()}
                    </span>
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
}