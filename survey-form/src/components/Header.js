import React from "react";


function Header() {
    return (
        <header style={styles.header}>
            <img 
                src="/LogoCanella.png" // Substitua pelo link ou caminho da sua logo
                alt="Logo"
                style={styles.logo}
            />
            <p style={styles.text}><strong>Ajude-nos a melhorar! Deixe aqui sua avaliação de nossos Serviços</strong></p>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: "#F7E9EC", // Cor de fundo do header
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
        alignItems: "center",
        height: "100px", // Altura do header
        position: "sticky", // Fixa o header durante o scroll
        top: 0, // Gruda o header na parte superior
        zIndex: 1000, // Garante que o header fique acima de outros elementos
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra para destaque
    },
    logo: {
        maxWidth: "300px", // Largura máxima da logo
        height: "auto",
    },
    text: {
        margin: "0px"
    }
};


export default Header;
