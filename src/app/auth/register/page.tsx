'use client';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/useStore";  // Zustand store
import { useRouter } from "next/navigation";

export default function Register() {
  // const { resetStore } = useAuthStore(); // Get resetStore from Zustand

  // useEffect(() => {
  //   localStorage.clear(); 
  //   resetStore();  
  //   console.log("Local Storage cleared and Zustand store reset.");
  // }, []);  

  const [form, setForm] = useState({
    id: 0,
    name: "", 
    email: "", 
    phone: "", 
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");  
  const { register } = useAuthStore();  // Get the register function from Zustand store
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password } = form;
    const newMember = {
      id:Date.now(),
      name,
      email,
      phone,
      password,
    };

    const result = register(newMember); 

    if (result === 'Регистрация успешна! Теперь выполните вход.') {
      alert(result);  
      router.push('/auth/login'); 
    } else {
      setErrorMessage(result); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-purple-600 to-blue-800">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Регистрация</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Имя</label>
            <input
              type="text"
              name="name"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Телефон</label>
            <input
              type="text"
              name="phone"
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.phone}
              onChange={handleChange}
              placeholder="Введите ваш телефон"
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
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Уже есть аккаунт?{' '}
          <a href="/auth/login" className="text-purple-600 hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
