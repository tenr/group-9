import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

function Main() {
  const CLIENT_ID = "31e12d87398d4262a452844b5f3bffd2";
  const REDIRECT_URI = "http://localhost:3001";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;

    // let token = window.localStorage.getItem("token");
    // setToken(token);

    if (!token && hash) {
      const newToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      // window.localStorage.setItem("token", token);
      setToken(newToken);
      console.log(token);
    }
  }, [token]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const checkTopTracks = (event) => {
    axios({
      method: "post",
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=0",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .post(
    //     "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=0",
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((error) => {
    //     console.error("error shorty");
    //   });
  };

  useEffect(() => {
    if (token !== "") {
      checkTopTracks();
    }
  }, [token]);

  return (
    <div>
      <h1>HELLO!</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          LINK
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {/* {token?


          :
          
        }; */}
    </div>
  );
}

export default Main;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Main() {

// const CLIENT_ID = "31e12d87398d4262a452844b5f3bffd2";
// const REDIRECT_URI = "http://localhost:3001";
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
// const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// const RESPONSE_TYPE = "code";
// const SCOPE = "user-read-private user-read-email";
// const CODE_VERIFIER_LENGTH = 128;

// const [token, setToken] = useState("");

// function generateRandomString(length) {
//   let text = "";
//   let possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// async function generateCodeChallenge(codeVerifier) {
//   function base64UrlEncode(str) {
//     let base64 = btoa(str);
//     base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
//     return base64;
//   }

//   let buffer = new TextEncoder().encode(codeVerifier);
//   let digest = await crypto.subtle.digest("SHA-256", buffer);
//   let base64Encoded = base64UrlEncode(String.fromCharCode(...new Uint8Array(digest)));
//   return base64Encoded;
// }

// function handleAuth() {
//   let codeVerifier = generateRandomString(CODE_VERIFIER_LENGTH);
//   let codeChallenge = generateCodeChallenge(codeVerifier);

//   let url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${SCOPE}`;

//   window.location.href = url;
// }

// useEffect(() => {
//   const searchParams = new URLSearchParams(window.location.search);
//   const code = searchParams.get("code");

//   if (code) {
//     let codeVerifier = localStorage.getItem("codeVerifier");
//     let grantType = "authorization_code";

//     axios({
//       method: "post",
//       url: TOKEN_ENDPOINT,
//       params: {
//         client_id: CLIENT_ID,
//         grant_type: grantType,
//         code: code,
//         redirect_uri: REDIRECT_URI,
//         code_verifier: codeVerifier,
//       },
//     })
//       .then((response) => {
//         setToken(response.data.access_token);
//         localStorage.removeItem("codeVerifier");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }, []);

// function handleGetUser() {
//   axios({
//     method: "get",
//     url: "https://api.spotify.com/v1/me",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
