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
import SweetAlert from "sweetalert-react";
import { renderToStaticMarkup } from "react-dom/server";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [user, setUser] = useState("");
  const { picture, name, email } = user;
  const [text, setText] = useState(`${name?.first} ${name?.last}`);
  const [title, setTitle] = useState("My name is");
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [show, setShow] = useState(false);
  const notify = () => toast("Wow so easy!");

  function getUser() {
    axios(url)
      .then((res) => {
        setUser(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setText(`${name?.first} ${name?.last}`);
    setTitle("My name is");
  }, [`${name?.first} ${name?.last}`]);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    getUser();
  }, []);

  const handleAdd = () => {
    const isUserExists = data.find((item) => item.email === email);
    if (!isUserExists) {
      setShow(true);
      toast.success("You added a new user!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setData([
        ...data,
        {
          firstName: `${name?.first} ${name?.last}`,
          email: email,
          phone: user.phone,
          age: user.dob?.age,
        },
      ]);
    } else {
      toast.error("You can't add the same user again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <main>
      <div className="block bcg-orange ">
        <img className="brand-img" src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block ">
        <div className="container ">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">{title}</p>
          <p className="user-value">{text}</p>
          <div className="values-list">
            <button
              onMouseOver={() => {
                setText(`${name?.title}. ${name?.first} ${name?.last}`);
                setTitle("My name is");
              }}
              className="icon"
              data-label="name"
            >
              <img
                src={user.gender == "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
              />
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
            <button
              onMouseOver={() => {
                setText(`${user.dob?.age} `);
                setTitle("My age is");
              }}
              className="icon"
              data-label="age"
            >
              <img
                src={user.gender == "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              onMouseOver={() => {
                setText(`${user.location?.city} / ${user.location?.country} `);
                setTitle("My address is");
              }}
              className="icon"
              data-label="street"
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              onMouseOver={() => {
                setText(`${user.phone}  `);
                setTitle("My phone is");
              }}
              className="icon"
              data-label="phone"
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              onMouseOver={() => {
                setText(
                  `${user?.login?.username} / ${user?.login?.password}  `
                );
                setTitle("My username / password is");
              }}
              className="icon"
              data-label="password"
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button onClick={getUser} className="btn" type="button">
              new user
            </button>
            <button
              onClick={() => {
                handleAdd();
              }}
              className="btn"
              type="button"
            >
              add user
            </button>
          </div>
          <>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>

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
              {data.map((item, i) => (
                <tr key={i} className="body-tr">
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
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
