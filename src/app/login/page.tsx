// app/login/page.js

"use client";
import React, { useState } from "react";
import Link from "next/link.js";

import { useAuth } from "@/hooks";

const LoginForm = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    signIn({ email: email.trim(), password });
  };

  return (
    <div>
      <div>
        <p>Inicia Sesión</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Iniciar Sesión</button>
        <button type="button" onClick={signInWithGoogle}>
          Google{" "}
        </button>
      </form>

      <div>
        <p>
          ¿Aún no tienes cuenta? <Link href="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
