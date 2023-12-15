import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [user, setUser] = useState("");
  const { picture, name, email } = user;
  const [text, setText] = useState(`${name?.first} ${name?.last}`);
  const [title, setTitle] = useState("My name is");
  function getUser() {
    axios(url)
      .then((res) => {
        setUser(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    setText(name?.first);
  }, [name?.first]);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">{title}</p>
          <p className="user-value">{text}</p>
          <div className="values-list">
            <button
              onMouseOver={() => {
                setText(`${name?.first} ${name?.last}`);
                setTitle("My name is");
              }}
              className="icon"
              data-label="name"
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>

            <button
              onMouseOver={() => {
                setText(`${email} `);
                setTitle("My email is");
              }}
              className="icon"
              data-label="email"
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button onClick={getUser} className="btn" type="button">
              new user
            </button>
            <button className="btn" type="button">
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr className="body-tr"></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
