import React from "react";

function EmojiRating({ title, currentRating, onRatingChange }) {
    const emojis = ["😡", "😟", "😐", "😊", "😁"];

    const handleRating = (index) => {
        onRatingChange(title, index + 1);
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
                        <span style={styles.emojiText}>{emoji}</span>
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
        margin: "15px auto",
        textAlign: "center",
        padding: "0 10px",
        "@media (max-width: 425px)": {
            margin: "12px auto",
            padding: "0 5px",
        },
        "@media (max-width: 375px)": {
            margin: "10px auto",
        },
        "@media (max-width: 320px)": {
            margin: "8px auto",
        }
    },
    title: {
        fontSize: "1.2rem",
        marginBottom: "10px",
        fontWeight: "normal",
        padding: "0 5px",
        "@media (max-width: 425px)": {
            fontSize: "1.1rem",
            marginBottom: "8px",
        },
        "@media (max-width: 375px)": {
            fontSize: "1rem",
            marginBottom: "6px",
        },
        "@media (max-width: 320px)": {
            fontSize: "0.9rem",
            marginBottom: "5px",
        }
    },
    emojiContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        flexWrap: "wrap",
        "@media (max-width: 425px)": {
            gap: "6px",
        },
        "@media (max-width: 375px)": {
            gap: "4px",
        },
        "@media (max-width: 320px)": {
            gap: "3px",
        }
    },
    emojiButton: {
        fontSize: "1.8rem",
        backgroundColor: "#f0f0f0",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        transition: "transform 0.2s, background-color 0.2s",
        "@media (max-width: 425px)": {
            width: "45px",
            height: "45px",
            fontSize: "1.6rem",
        },
        "@media (max-width: 375px)": {
            width: "40px",
            height: "40px",
            fontSize: "1.4rem",
        },
        "@media (max-width: 320px)": {
            width: "35px",
            height: "35px",
            fontSize: "1.2rem",
        },
        ":hover": {
            transform: "scale(1.1)",
        },
        ":active": {
            transform: "scale(0.95)",
        }
    },
    emojiText: {
        lineHeight: 1,
        display: "block",
        transform: "translateY(1px)", // Ajuste fino para centralização vertical
    },
    feedback: {
        marginTop: "8px",
        fontSize: "0.9rem",
        color: "#666",
        "@media (max-width: 425px)": {
            fontSize: "0.85rem",
            marginTop: "6px",
        },
        "@media (max-width: 375px)": {
            fontSize: "0.8rem",
            marginTop: "5px",
        },
        "@media (max-width: 320px)": {
            fontSize: "0.75rem",
            marginTop: "4px",
        }
    }
};

export default EmojiRating;