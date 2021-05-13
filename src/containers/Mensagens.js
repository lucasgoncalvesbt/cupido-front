import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";

export default function Notes() {
    const { id } = useParams();
    const [mensagem, setMensagem] = useState(null);
    const [content, setContent] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        function loadNote() {
            return API.get("mensagens", `/mensagens/${id}`);
        }

        async function onLoad() {
            try {
                const mensagem = await loadNote();
                const { content, address } = mensagem;


                setContent(content);
                setAddress(address);
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
                <div>
                    <h4>Mensagem para {address}</h4>
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
}