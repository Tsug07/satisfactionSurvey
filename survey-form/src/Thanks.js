import React, { useEffect } from "react";

function Thanks() {
    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos"; // Altera o título da página
    }, []);
    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Obrigado pelo seu feedback!</h1>
            <p style={textStyle}>Agradecemos sinceramente por dedicar seu tempo para preencher nossa avaliação, seu feedback tem nos ajudado a melhorar constantemente. Sua resposta foi registrada.</p>
            <p style={textStyle}><strong>Você pode fechar esta página.</strong></p>
        </div>
    );
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    textAlign: "center",
    backgroundColor: "#F7E9EC",
    color: "#333",
};

const headerStyle = {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#4caf50",
};

const textStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.5",
    width: "300px"
};

export default Thanks;
