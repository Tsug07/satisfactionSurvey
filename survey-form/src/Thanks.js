import React, { useEffect } from "react";

function Thanks() {
    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos";
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.header}>Obrigado pelo seu feedback!</h1>
                <p style={styles.text}>
                    Agradecemos sinceramente por dedicar seu tempo para preencher nossa avaliação, sua resposta foi registrada.
                    Seu feedback tem nos ajudado a melhorar constantemente. 
                </p>
                <p style={styles.strongText}>
                    <strong>Você pode fechar esta página.</strong>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F7E9EC",
        with: "100%",
        color: "#333",
        margin: "0px",
        padding: "20px",
        boxSizing: "border-box",
        "@media (max-width: 425px)": {
            padding: "15px",
        },
        "@media (max-width: 320px)": {
            padding: "10px",
        }
    },
    content: {
        maxWidth: "800px",
        width: "100%",
        margin: "0px",
        textAlign: "center",
        padding: "20px",
        "@media (max-width: 425px)": {
            padding: "15px",
        },
        "@media (max-width: 320px)": {
            padding: "10px",
        }
    },
    header: {
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#4caf50",
        lineHeight: "1.2",
        "@media (max-width: 425px)": {
            fontSize: "2rem",
            marginBottom: "15px",
        },
        "@media (max-width: 375px)": {
            fontSize: "1.8rem",
            marginBottom: "12px",
        },
        "@media (max-width: 320px)": {
            fontSize: "1.5rem",
            marginBottom: "10px",
        }
    },
    text: {
        fontSize: "1.2rem",
        lineHeight: "1.5",
        marginBottom: "20px",
        padding: "0 10px",
        "@media (max-width: 425px)": {
            fontSize: "1.1rem",
            marginBottom: "15px",
            padding: "0 5px",
        },
        "@media (max-width: 375px)": {
            fontSize: "1rem",
            marginBottom: "12px",
        },
        "@media (max-width: 320px)": {
            fontSize: "0.9rem",
            marginBottom: "10px",
        }
    },
    strongText: {
        fontSize: "1.2rem",
        lineHeight: "1.5",
        color: "#4caf50",
        "@media (max-width: 425px)": {
            fontSize: "1.1rem",
        },
        "@media (max-width: 375px)": {
            fontSize: "1rem",
        },
        "@media (max-width: 320px)": {
            fontSize: "0.9rem",
        }
    }
};

export default Thanks;