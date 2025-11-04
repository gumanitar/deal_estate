import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation, useSignupMutation } from "../../api/authApiSlice";

import type { UserInterface } from "../../interfaces/userInterface";

export default function useAuth(formMode: string) {
  const initialData = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<UserInterface>(initialData);
  const [validationErrors, setValidationErrors] =
    useState<UserInterface | null>(null);
  const [authorizationErrors, setAuthorizationErrors] = useState<string | null>(
    null
  );
  const [authorizationMsg, setAuthorizationMsg] = useState<string | null>(null);
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    setValidationErrors(null);
    setAuthorizationErrors(null);
  }, [user?.email, user?.name, user?.password]);

  const inputHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let userData;
      switch (formMode) {
        case "login":
          userData = await login(user).unwrap();
          dispatch(
            setCredentials({
              accessToken: (userData as any).accessToken,
              user: { email: user.email },
            })
          );
          setUser(initialData);
          navigate("/deals", { replace: true });
          break;
        case "signup":
          userData = await signup(user).unwrap();
          setUser(initialData);
          setAuthorizationMsg(
            "✅You’ve signed up successfully! Please log in — you’ll be redirected shortly."
          );
          setTimeout(() => {
            navigate("/auth", { replace: true, state: { formMode: "login" } });
          }, 5000);
          break;
      }
    } catch (err: any) {
      if (err.status === 400) {
        setValidationErrors(err.data);
      } else if (err.status === 401) {
        setAuthorizationErrors(err.data.message);
      }
    }
  };

  return {
    inputHandler,
    submitHandler,
    validationErrors,
    authorizationErrors,
    authorizationMsg,
  };
}
