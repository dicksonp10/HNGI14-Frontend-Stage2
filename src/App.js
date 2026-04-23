import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <Dashboard />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
