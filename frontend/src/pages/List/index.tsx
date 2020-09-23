/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

interface Events {
  id: string;
  userId: string;
  name: string;
  picture: string;
  description: string;
  location: string;
}

export default function List() {
  const [events, setEvents] = useState<Events[]>([]);
  const [idDelete, setIdDelete] = useState<string>("");

  useEffect(() => {
    api.get("events").then((response) => {
      setEvents(response.data);
    });
  }, [idDelete]);

  useEffect(() => {
    console.log(idDelete);
    api.delete(`events/${idDelete}`).then((response) => {
      setIdDelete("");
    });
    console.log("ok");
  }, [idDelete]);

  if (!localStorage.getItem("id")) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="profile-container">
      {events.map((event) => (
        <div className="card">
          <img src={`http://localhost:3333${event.picture}`} alt="" />
          <div className="teste2">
            <h1>{event.name}</h1>
            <h3>{event.description}</h3>
            <h3>{event.location}</h3>
            {localStorage.getItem("id") === event.userId ? (
              <a onClick={() => setIdDelete(event.id)}>
                <FiTrash2
                  key={event.id}
                  style={{
                    bottom: "0",
                    right: "0",
                  }}
                  color={"red"}
                  size={25}
                ></FiTrash2>
              </a>
            ) : null}
          </div>
        </div>
      ))}

      <a
        href="/"
        onClick={() => localStorage.removeItem("id")}
        className="fixedbuttonRight"
      >
        Sair
      </a>
      <a href="/create" className="fixedbuttonMid">
        Adiconar
      </a>
      <a href="/create" className="fixedbuttonLeft">
        Voltar
      </a>
    </div>
  );
}
