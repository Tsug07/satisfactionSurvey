import React from "react";

function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <img 
                    src="/LogoCanella.png"
                    alt="Logo"
                    style={styles.logo}
                />
                <p style={styles.text}>
                    <strong>Ajude-nos a melhorar! Deixe aqui sua avaliação sobre nossos Serviços</strong>
                </p>
            </div>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: "#F7E9EC",
        padding: "10px 15px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        width: "100%",
        boxSizing: "border-box",
        "@media (max-width: 425px)": {
            padding: "8px 10px",
        },
        "@media (max-width: 320px)": {
            padding: "6px 8px",
        }
    },
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        "@media (max-width: 425px)": {
            gap: "8px",
        },
        "@media (max-width: 320px)": {
            gap: "6px",
        }
    },
    logo: {
        width: "280px",
        height: "auto",
        maxWidth: "100%",
        "@media (max-width: 425px)": {
            width: "240px",
        },
        "@media (max-width: 375px)": {
            width: "220px",
        },
        "@media (max-width: 320px)": {
            width: "200px",
        }
    },
    text: {
        margin: "0",
        textAlign: "center",
        fontSize: "1rem",
        lineHeight: "1.4",
        padding: "0 10px",
        "@media (max-width: 425px)": {
            fontSize: "0.9rem",
            padding: "0 8px",
        },
        "@media (max-width: 375px)": {
            fontSize: "0.85rem",
            padding: "0 6px",
        },
        "@media (max-width: 320px)": {
            fontSize: "0.8rem",
            padding: "0 5px",
        }
    }
};

export default Header;