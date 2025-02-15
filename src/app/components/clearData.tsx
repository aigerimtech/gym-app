import { useAuthStore } from "@/app/store/useStore";

export default function ClearData() {
  const { resetStore } = useAuthStore();

  const handleClear = () => {
    resetStore();  // Reset Zustand store state
    localStorage.clear();  // Optionally clear localStorage to get a clean slate
    console.log("Data cleared.");
  };

  return (
    <button onClick={handleClear}>Clear All Data</button>
  );
}
