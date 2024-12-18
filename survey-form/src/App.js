import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmojiRating from "./EmojiRating";
import emailjs from "emailjs-com";
import Thanks from "./Thanks";

// Estilos atualizados com breakpoints específicos para mobile
const styles = {
    container: {
      padding: "10px",
      maxWidth: "800px",
      margin: "0 auto",
      "@media (max-width: 425px)": {
        padding: "8px",
      },
      "@media (max-width: 320px)": {
        padding: "5px",
      }
    },
    section: {
      backgroundColor: "#F7E9EC",
      padding: "15px 5px",
      marginBottom: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      "@media (max-width: 425px)": {
        padding: "10px 3px",
        marginBottom: "10px",
      },
      "@media (max-width: 320px)": {
        padding: "8px 2px",
        marginBottom: "8px",
      }
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "1.5rem",
      margin: "10px 0",
      "@media (max-width: 425px)": {
        fontSize: "1.2rem",
        margin: "8px 0",
      },
      "@media (max-width: 375px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width: 320px)": {
        fontSize: "1rem",
      }
    },
    feedbackTitle: {
      fontSize: "1.1rem",
      margin: "10px 0",
      padding: "0 10px",
      "@media (max-width: 425px)": {
        fontSize: "1rem",
        padding: "0 5px",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width: 320px)": {
        fontSize: "0.85rem",
      }
    },
    textarea: {
      width: "90%",
      margin: "10px auto",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      display: "block",
      boxSizing: "border-box",
      "@media (max-width: 425px)": {
        width: "95%",
        padding: "8px",
        fontSize: "0.9rem",
      },
      "@media (max-width: 375px)": {
        width: "98%",
        padding: "6px",
        fontSize: "0.85rem",
      },
      "@media (max-width: 320px)": {
        width: "98%",
        padding: "5px",
        fontSize: "0.8rem",
      }
    },
    submitButton: {
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      padding: "12px 24px",
      fontSize: "1rem",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      "@media (max-width: 425px)": {
        width: "95%",
        padding: "10px",
        fontSize: "0.9rem",
      },
      "@media (max-width: 375px)": {
        width: "98%",
        padding: "8px",
        fontSize: "0.85rem",
      },
      "@media (max-width: 320px)": {
        width: "98%",
        padding: "8px",
        fontSize: "0.8rem",
      },
      ":hover": {
        backgroundColor: "#45a049",
      }
    }
  };

function App() {
    const [feedback1, setFeedback1] = useState("");
    const [feedback2, setFeedback2] = useState("");
    const [ratings, setRatings] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos";
    }, []);

    const handleRatingChange = (title, rating) => {
        setRatings((prev) => ({
            ...prev,
            [title]: rating,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Log dos dados antes de formatar
      console.log("Ratings originais:", ratings);
  
      // Formatar dados para o banco de dados
      const dbData = {
          tempo_de_entrega: Number(ratings["Tempo de Entrega dos Serviços"]) || 0,
          qualidade_da_entrega: Number(ratings["Qualidade das Entregas"]) || 0,
          tempo_de_resposta: Number(ratings["Tempo de Resposta"]) || 0,
          qualidade_do_atendimento: Number(ratings["Qualidade do Atendimento"]) || 0,
          nosso_relacionamento: Number(ratings["Como Avalia Nosso Relacionamento"]) || 0,
          agregar_valor: Number(ratings["Nossos Serviços Agregam Valor ao Seu Negócio"]) || 0,
          palavra: String(feedback1 || "").trim(),
          observacoes: String(feedback2 || "").trim()
      };
  
      // Log dos dados formatados
      console.log("Dados formatados para envio:", dbData);
  
      try {
        console.log("Enviando dados:", dbData);

        const response = await fetch('https://satisfaction-survey-delta.vercel.app/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData)
        });

        // Log da resposta
        console.log("Status da resposta:", response.status);
        
        const responseText = await response.text();
        console.log("Resposta completa:", responseText);

        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Resposta inválida do servidor: ${responseText}`);
        }

        if (!response.ok) {
            throw new Error(responseData.error || `Erro do servidor: ${response.status}`);
        }

        // Se chegou aqui, os dados foram salvos com sucesso
        console.log("Sucesso:", responseData);
  
          // Se chegou até aqui, os dados foram salvos com sucesso
          // Agora envia o email
          const emailContent = {
              subject: "Pesquisa de Satisfação - Respostas do Cliente",
              to_name: "Equipe Canella & Santos",
              from_name: "Pesquisa de Satisfação",
              tempo_entrega: `${dbData.tempo_de_entrega}`|| "Nenhum feedback fornecido.",
              qualidade_entregas: `${dbData.qualidade_da_entrega}`|| "Nenhum feedback fornecido.",
              tempo_resposta: `${dbData.tempo_de_resposta}`|| "Nenhum feedback fornecido.",
              qualidade_atendimento: `${dbData.qualidade_do_atendimento}`|| "Nenhum feedback fornecido.",
              relacionamento: `${dbData.nosso_relacionamento}`|| "Nenhum feedback fornecido.",
              servicos_valor: `${dbData.agregar_valor}`|| "Nenhum feedback fornecido.",
              feedback1: dbData.palavra || "Nenhum feedback fornecido.",
              feedback2: dbData.observacoes || "Nenhum feedback fornecido."
          };
  
          await emailjs.send(
              "service_mp1or57",
              "template_2mhlnrm",
              emailContent,
              "o0sumI06EDLRXZoOe"
          );
  
          // Redireciona para a página de agradecimento
          navigate("/thanks");
  
      } catch (error) {
          console.error("Erro detalhado:", error);
          alert(`Erro ao enviar os dados: ${error.message}`);
      }
  };

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>ENTREGA</h3>
                <EmojiRating
                    title="Tempo de Entrega dos Serviços"
                    currentRating={ratings["Tempo de Entrega dos Serviços"] || null}
                    onRatingChange={handleRatingChange}
                />
                <EmojiRating
                    title="Qualidade das Entregas"
                    currentRating={ratings["Qualidade das Entregas"] || null}
                    onRatingChange={handleRatingChange}
                />
            </div>

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>ATENDIMENTO</h3>
                <EmojiRating
                    title="Tempo de Resposta"
                    currentRating={ratings["Tempo de Resposta"] || null}
                    onRatingChange={handleRatingChange}
                />
                <EmojiRating
                    title="Qualidade do Atendimento"
                    currentRating={ratings["Qualidade do Atendimento"] || null}
                    onRatingChange={handleRatingChange}
                />
            </div>

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>RELACIONAMENTO</h3>
                <EmojiRating
                    title="Como Avalia Nosso Relacionamento"
                    currentRating={ratings["Como Avalia Nosso Relacionamento"] || null}
                    onRatingChange={handleRatingChange}
                />
                <EmojiRating
                    title="Nossos Serviços Agregam Valor ao Seu Negócio"
                    currentRating={ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || null}
                    onRatingChange={handleRatingChange}
                />
            </div>

            <div style={styles.feedbackSection}>
                <h4 style={styles.feedbackTitle}>Em uma palavra, como você descreveria nossa contabilidade?</h4>
                <textarea
                    value={feedback1}
                    onChange={(e) => setFeedback1(e.target.value)}
                    placeholder="Deixe seu feedback sobre o atendimento"
                    style={{ ...styles.textarea, height: "30px" }}
                />
                <h4 style={styles.feedbackTitle}>Fique à vontade para fazer sugestões ou observações!</h4>
                <textarea
                    value={feedback2}
                    onChange={(e) => setFeedback2(e.target.value)}
                    placeholder="Deixe sugestões ou comentários adicionais"
                    style={{ ...styles.textarea, height: "80px" }}
                />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={handleSubmit} style={styles.submitButton}>
                    Enviar Feedback
                </button>
            </div>
        </div>
    );
}

function MainApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/thanks" element={<Thanks />} />
            </Routes>
        </Router>
    );
}

export default MainApp;