import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import InvoiceCard from "../components/Invoices/InvoiceCard";
import InvoiceDetail from "../components/Invoices/InvoiceDetail";
import InvoiceForm from "../components/Invoices/InvoiceForm";
import Filter from "../components/UI/Filter";
import EmptyState from "../components/UI/EmptySpace";
import DeleteModal from "../components/UI/DeleteModal";
import Button from "../components/common/Button";
import { useInvoices } from "../context/InvoiceContext";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice } = useInvoices();
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });

  const handleCreateInvoice = (invoiceData) => {
    addInvoice(invoiceData);
    setShowForm(false);
  };

  const handleUpdateInvoice = (invoiceData) => {
    updateInvoice(editingInvoice.id, invoiceData);
    setEditingInvoice(null);
    setShowForm(false);
    setSelectedInvoice(null);
  };

  const handleDeleteClick = () => {
    deleteInvoice(invoiceToDelete);
    setShowDeleteModal(false);
    setInvoiceToDelete(null);
    setSelectedInvoice(null);
  };

  const handleMarkAsPaid = (invoice) => {
    if (invoice.status !== "paid") {
      updateInvoice(invoice.id, { ...invoice, status: "paid" });
      setSelectedInvoice({ ...invoice, status: "paid" });
    }
  };

  const getInvoiceCountText = () => {
    if (filter === "all") {
      return `There are ${filteredInvoices.length} total invoices`;
    }
    return `There are ${filteredInvoices.length} ${filter} invoices`;
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0C0E16] dark:text-white">
            Invoices
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            {getInvoiceCountText()}
          </p>
        </div>

        <div className="flex gap-4 md:gap-10 items-center w-full md:w-auto justify-between md:justify-end">
          <Filter currentFilter={filter} onFilterChange={setFilter} />
          <Button
            onClick={() => {
              setEditingInvoice(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="bg-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
              <FaPlus className="text-purple-600 text-xs md:text-sm" />
            </div>
            <span>New Invoice</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <EmptyState />
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onClick={setSelectedInvoice}
            />
          ))
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && !showForm && (
        <InvoiceDetail
          invoice={selectedInvoice}
          onEdit={(invoice) => {
            setEditingInvoice(invoice);
            setSelectedInvoice(null);
            setShowForm(true);
          }}
          onDelete={(id) => {
            setInvoiceToDelete(id);
            setShowDeleteModal(true);
            setSelectedInvoice(null);
          }}
          onMarkAsPaid={handleMarkAsPaid}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      {/* Invoice Form Modal */}
      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={editingInvoice ? handleUpdateInvoice : handleCreateInvoice}
          onClose={() => {
            setShowForm(false);
            setEditingInvoice(null);
          }}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setInvoiceToDelete(null);
        }}
        onConfirm={handleDeleteClick}
        invoiceId={invoiceToDelete}
      />
    </MainLayout>
  );
};

export default Dashboard;
