import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 15px auto;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 425px) {
    margin: 12px auto;
    padding: 0 5px;
  }

  @media (max-width: 375px) {
    margin: 10px auto;
  }

  @media (max-width: 320px) {
    margin: 8px auto;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: normal;
  padding: 0 5px;

  @media (max-width: 425px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
`;

const EmojiGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 425px) {
    gap: 6px;
  }

  @media (max-width: 375px) {
    gap: 4px;
  }

  @media (max-width: 320px) {
    gap: 3px;
  }
`;

const EmojiButton = styled.button`
  font-size: 1.8rem;
  background-color: ${props => props.selected ? "#4caf50" : "#f0f0f0"};
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 425px) {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
  }

  @media (max-width: 375px) {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`;

const Feedback = styled.p`
  margin-top: 8px;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 425px) {
    font-size: 0.85rem;
    margin-top: 6px;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
    margin-top: 5px;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    margin-top: 4px;
  }
`;

function EmojiRating({ title, currentRating, onRatingChange }) {
    const emojis = ["😡", "😟", "😐", "😊", "😁"];

    const handleRating = (index) => {
        onRatingChange(title, index + 1);
    };

    return (
        <Container>
            <Title>{title}</Title>
            <EmojiGrid>
                {emojis.map((emoji, index) => (
                    <EmojiButton
                        key={index}
                        onClick={() => handleRating(index)}
                        selected={currentRating === index + 1}
                    >
                        {emoji}
                    </EmojiButton>
                ))}
            </EmojiGrid>
            <Feedback>
                Sua avaliação: {currentRating ? `${currentRating}/5` : "Ainda não avaliado"}
            </Feedback>
        </Container>
    );
}

export default EmojiRating;