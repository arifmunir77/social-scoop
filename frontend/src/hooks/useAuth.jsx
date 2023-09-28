import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axio-service";

function UserAuthHook() {
   
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const parseJwt = () => {
    try {
      return JSON.parse(
        window.atob(localStorage.getItem("token").split(".")[1])
      );
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    try {
      const jwtPayload = parseJwt();
      if (jwtPayload) {
        if (Date.now() <= jwtPayload.exp * 1000) {
          setUser(true);
          return;
        }
        signOut();
      }
    } catch (e) {
      setUser(false);
      clearToken();
    }
  }, []);

  useEffect(() => {
    try {
      if (user === false) return;

      const myInterval = setInterval(function () {
        const jwtPayload = parseJwt();
        if (jwtPayload) {
          if (Date.now() > jwtPayload.exp * 1000) {
            clearInterval(myInterval);
            clearToken();
          }
        } else {
          clearInterval(myInterval);
          clearToken();
        }
      }, 1000);
    } catch (e) {
      clearToken();
    }
  }, [user]);

  const saveToken = (token) => {
    localStorage.setItem("access_token", token.access_token);
  };

  const clearToken = () => {
    localStorage.removeItem("access_token");

    setUser(false);
  };

  const signIn = (data) =>
    new Promise((resolve, reject) => {
      axiosInstance
        .post(`/`, data)
        .then((response) => {
          saveToken(response?.data);
          resolve(response?.data);
        })
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  const signUp = (data) =>
    new Promise((resolve, reject) => {
      axiosInstance
        .post(`register`, data)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });

  return {
    user,
    signIn,
    signUp,
    clearToken,
  };
}

export default UserAuthHook;
