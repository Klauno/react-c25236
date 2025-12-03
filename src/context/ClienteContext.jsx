import { createContext, useContext, useState } from "react";

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [cliente, setCliente] = useState(() => {
    const saved = localStorage.getItem("clienteDatos");
    return saved ? JSON.parse(saved) : null;
  });

  const guardarCliente = (datos) => {
    setCliente(datos);
    localStorage.setItem("clienteDatos", JSON.stringify(datos));
  };

  return (
    <ClienteContext.Provider value={{ cliente, guardarCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => useContext(ClienteContext);
