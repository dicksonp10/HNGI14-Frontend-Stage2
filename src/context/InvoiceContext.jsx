import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const InvoiceContext = createContext();

const sampleInvoices = [
  {
    id: "RT3080",
    createdAt: "2021-08-18T00:00:00.000Z",
    paymentDue: "2021-08-19T00:00:00.000Z",
    description: "Graphic Design",
    paymentTerms: 1,
    clientName: "Jensen Huang",
    clientEmail: "jensen@example.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    items: [{ name: "Logo Design", quantity: 1, price: 1800.9, total: 1800.9 }],
    total: 1800.9,
  },
  {
    id: "XM9141",
    createdAt: "2021-08-21T00:00:00.000Z",
    paymentDue: "2021-09-20T00:00:00.000Z",
    description: "Web Development",
    paymentTerms: 30,
    clientName: "Alex Grim",
    clientEmail: "alex@example.com",
    status: "pending",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    items: [
      { name: "Website Redesign", quantity: 1, price: 556.0, total: 556.0 },
    ],
    total: 556.0,
  },
  {
    id: "RG0314",
    createdAt: "2021-09-20T00:00:00.000Z",
    paymentDue: "2021-10-01T00:00:00.000Z",
    description: "App Design",
    paymentTerms: 11,
    clientName: "John Morrison",
    clientEmail: "john@example.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "79 Dover Road",
      city: "Westhall",
      postCode: "IP19 3PF",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Mobile App Design",
        quantity: 1,
        price: 14002.33,
        total: 14002.33,
      },
    ],
    total: 14002.33,
  },
  {
    id: "RT2080",
    createdAt: "2021-09-20T00:00:00.000Z",
    paymentDue: "2021-10-12T00:00:00.000Z",
    description: "Logo Concept",
    paymentTerms: 22,
    clientName: "Alysa Werner",
    clientEmail: "alysa@example.com",
    status: "pending",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "63 Warwick Road",
      city: "Carlisle",
      postCode: "CA1 2LU",
      country: "United Kingdom",
    },
    items: [
      { name: "Logo Sketches", quantity: 1, price: 102.04, total: 102.04 },
    ],
    total: 102.04,
  },
  {
    id: "AA1449",
    createdAt: "2021-10-14T00:00:00.000Z",
    paymentDue: "2021-10-14T00:00:00.000Z",
    description: "Re-branding",
    paymentTerms: 0,
    clientName: "Mellisa Clarke",
    clientEmail: "mellisa@example.com",
    status: "pending",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "46 Abbey Row",
      city: "Cambridge",
      postCode: "CB5 6EG",
      country: "United Kingdom",
    },
    items: [
      { name: "Branding Guide", quantity: 1, price: 4032.33, total: 4032.33 },
    ],
    total: 4032.33,
  },
  {
    id: "TY9141",
    createdAt: "2021-10-31T00:00:00.000Z",
    paymentDue: "2021-10-31T00:00:00.000Z",
    description: "Landing Page",
    paymentTerms: 0,
    clientName: "Thomas Wayne",
    clientEmail: "thomas@example.com",
    status: "pending",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "396 Llanthony Road",
      city: "London",
      postCode: "SE6 1QW",
      country: "United Kingdom",
    },
    items: [
      { name: "Web Design", quantity: 1, price: 6155.91, total: 6155.91 },
    ],
    total: 6155.91,
  },
  {
    id: "FV2353",
    createdAt: "2021-11-12T00:00:00.000Z",
    paymentDue: "2021-11-12T00:00:00.000Z",
    description: "Logo Re-design",
    paymentTerms: 0,
    clientName: "Anita Wainwright",
    clientEmail: "anita@example.com",
    status: "draft",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "23 Helmsdale Drive",
      city: "Ipswich",
      postCode: "IP3 9QJ",
      country: "United Kingdom",
    },
    items: [
      { name: "Logo Design", quantity: 1, price: 3102.04, total: 3102.04 },
    ],
    total: 3102.04,
  },
];

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useLocalStorage("invoices", sampleInvoices);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const updateInvoice = (id, updatedData) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updatedData } : inv)),
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoices must be used within InvoiceProvider");
  return context;
};
