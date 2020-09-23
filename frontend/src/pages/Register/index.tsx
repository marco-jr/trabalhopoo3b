import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post("users", data);
      // alert(`Seu ID de acesso: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
