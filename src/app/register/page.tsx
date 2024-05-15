// app/registro/page.js

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import { createUser } from "@/firebase/utils";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    createUser({ email: email.trim(), password, router });
  };

  return (
    <div>
      <div>
        <p>Crea tu cuenta</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit">Crear Cuenta</button>
      </form>

      <div>
        <p>
          ¿Ya tienes cuenta? <Link href="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
