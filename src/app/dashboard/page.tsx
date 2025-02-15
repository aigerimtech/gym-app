'use client';
import { useAuthStore } from "@/app/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Личный кабинет</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-yellow-400">Информация о пользователе</h2>
        <p className="text-gray-300 mt-2">Имя: {user.name}</p>
        <p className="text-gray-300">Email: {user.email}</p>
        <p className="text-gray-300">Телефон: {user.phone}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
        <h2 className="text-xl font-semibold text-purple-400">Абонемент</h2>
        <p className="text-gray-300 mt-2">Текущий абонемент: 12 посещений</p>
        <p className="text-gray-300">Остаток посещений: 5</p>
        <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg">
          Продлить абонемент
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
        <h2 className="text-xl font-semibold text-red-400">История посещений</h2>
        <ul className="text-gray-300 mt-2">
          <li>12 Февраля 2025 - Тренировка в 18:00</li>
          <li>10 Февраля 2025 - Тренировка в 19:00</li>
          <li>7 Февраля 2025 - Тренировка в 17:30</li>
        </ul>
      </div>

      <button
        onClick={() => {
          logout();
          router.push("/auth/login");
        }}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
      >
        Выйти
      </button>
    </div>
  );
}
