'use client';
import { useState } from "react";
import { useAuthStore } from "@/app/store/useStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(form);
    if (result === "Вход выполнен успешно!") {
      router.push("/dashboard"); // 🔥 Redirects to Dashboard
    } else {
      setErrorMessage(result);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-purple-600 to-indigo-700">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Вход</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Пароль</label>
            <input
              type="password"
              name="password"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.password}
              onChange={handleChange}
              placeholder="Введите ваш пароль"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Нет аккаунта?{' '}
          <a href="/auth/register" className="text-purple-600 hover:underline">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
}
