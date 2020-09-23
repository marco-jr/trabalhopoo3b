/* eslint-disable no-useless-concat */
import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ImageUploader from "react-images-upload";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.png";

const Event = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState<any>([]);

  if (!localStorage.getItem("id")) {
    return <Redirect to={"/"} />;
  }

  const onDrop = (picture) => {
    setPicture([...picture, picture]);
  };

  async function handleRegister(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("picture", picture[0]);

    try {
      const picture = await api.post("events/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = {
        name,
        userId: localStorage.getItem("id"),
        description,
        location,
        picture: picture.data.path,
      };

      try {
        const response = await api.post("events", data);

        console.log(response);
      } catch (error) {
        alert("Erro no cadastro, tente novamente.");
      }
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

          <h1>Cadastrar Evento</h1>
          <p>Faça o cadastro do Evento</p>

          <Link className="back-link" to="/list">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome evento"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <ImageUploader
            {...props}
            singleImage={true}
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
      <a
        href="/"
        onClick={() => localStorage.removeItem("id")}
        className="fixedbuttonRight"
      >
        Sair
      </a>
      <a href="/list" className="fixedbuttonMid">
        Lista
      </a>
      <a href="/list" className="fixedbuttonLeft">
        Voltar
      </a>
    </div>
  );
};

export default Event;
