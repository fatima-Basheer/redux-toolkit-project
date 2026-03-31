
import UsersList from "./features/users/UsersList";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl text-center font-bold py-6">
        Users & Todos
      </h1>

      <UsersList />
    </div>
  );
}

export default App;