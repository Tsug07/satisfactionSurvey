import React from "react";

function EmojiRating({ title, currentRating, onRatingChange }) {
    const emojis = ["😡", "😟", "😐", "😊", "😁"]; // Emojis representando 1-5

    const handleRating = (index) => {
        onRatingChange(title, index + 1); // Atualiza o valor da avaliação no pai
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.emojiContainer}>
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => handleRating(index)}
                        style={{
                            ...styles.emojiButton,
                            backgroundColor: currentRating === index + 1 ? "#4caf50" : "#f0f0f0",
                        }}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            <p style={styles.feedback}>
                Sua avaliação: {currentRating ? `${currentRating}/5` : "Ainda não avaliado"}
            </p>
        </div>
    );
}

const styles = {
    container: {
        margin: "20px auto",
        textAlign: "center",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "10px",
    },
    emojiContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    emojiButton: {
        fontSize: "2rem",
        backgroundColor: "#f0f0f0",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
    },
    feedback: {
        marginTop: "10px",
        fontSize: "1rem",
    },
};

export default EmojiRating;
