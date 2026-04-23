import React, { useState, useEffect } from "react";

// Sample data
const SAMPLE_INVOICES = [
  {
    id: "RT3080",
    clientName: "Jensen Huang",
    createdAt: "2021-08-18",
    paymentDue: "2021-08-19",
    status: "paid",
    total: 1800.9,
  },
  {
    id: "XM9141",
    clientName: "Alex Grim",
    createdAt: "2021-08-21",
    paymentDue: "2021-09-20",
    status: "pending",
    total: 556.0,
  },
  {
    id: "RG0314",
    clientName: "John Morrison",
    createdAt: "2021-09-20",
    paymentDue: "2021-10-01",
    status: "paid",
    total: 14002.33,
  },
  {
    id: "RT2080",
    clientName: "Alysa Werner",
    createdAt: "2021-09-20",
    paymentDue: "2021-10-12",
    status: "pending",
    total: 102.04,
  },
  {
    id: "AA1449",
    clientName: "Mellisa Clarke",
    createdAt: "2021-10-14",
    paymentDue: "2021-10-14",
    status: "pending",
    total: 4032.33,
  },
  {
    id: "TY9141",
    clientName: "Thomas Wayne",
    createdAt: "2021-10-31",
    paymentDue: "2021-10-31",
    status: "pending",
    total: 6155.91,
  },
  {
    id: "FV2353",
    clientName: "Anita Wainwright",
    createdAt: "2021-11-12",
    paymentDue: "2021-11-12",
    status: "draft",
    total: 3102.04,
  },
];

function App() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    return saved ? JSON.parse(saved) : SAMPLE_INVOICES;
  });
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    description: "",
    total: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isDark, setIsDark] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // Apply dark mode
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#141625";
    } else {
      document.body.style.backgroundColor = "#F8F8FB";
    }
  }, [isDark]);

  const filteredInvoices = invoices.filter((inv) =>
    filter === "all" ? true : inv.status === filter,
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return { background: "rgba(51, 214, 159, 0.1)", color: "#33D69F" };
      case "pending":
        return { background: "rgba(255, 143, 0, 0.1)", color: "#FF8F00" };
      default:
        return { background: "rgba(55, 59, 83, 0.1)", color: "#373B53" };
    }
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.clientName) errors.clientName = "Client name required";
    if (!formData.clientEmail) errors.clientEmail = "Email required";
    if (!formData.description) errors.description = "Description required";
    if (!formData.total || formData.total <= 0)
      errors.total = "Total must be positive";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newInvoice = {
      id: "INV" + Math.floor(Math.random() * 10000),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      description: formData.description,
      total: parseFloat(formData.total),
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentDue: new Date(Date.now() + 30 * 86400000).toISOString(),
    };

    setInvoices([newInvoice, ...invoices]);
    setShowForm(false);
    setFormData({
      clientName: "",
      clientEmail: "",
      description: "",
      total: "",
    });
    setFormErrors({});
  };

  const handleDelete = () => {
    setInvoices(invoices.filter((inv) => inv.id !== invoiceToDelete));
    setShowDeleteModal(false);
    setInvoiceToDelete(null);
    setSelectedInvoice(null);
  };

  const handleMarkAsPaid = (invoice) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoice.id ? { ...inv, status: "paid" } : inv,
      ),
    );
    setSelectedInvoice({ ...invoice, status: "paid" });
  };

  // Styles
  const styles = {
    app: { display: "flex", minHeight: "100vh" },
    sidebar: {
      width: "103px",
      background: "#373B53",
      borderRadius: "0 20px 20px 0",
      position: "fixed",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    logoContainer: {
      background: "#7C5DFA",
      borderRadius: "0 20px 20px 0",
      padding: "32px 0",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "white",
      position: "relative",
      zIndex: 1,
    },
    themeToggle: {
      padding: "32px 0",
      textAlign: "center",
      borderTop: "1px solid #DFE3FA",
      cursor: "pointer",
    },
    mainContent: {
      flex: 1,
      marginLeft: "103px",
      padding: "48px",
      maxWidth: "calc(100% - 103px)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "48px",
    },
    headerLeft: {},
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#0C0E16",
      marginBottom: "8px",
    },
    subtitle: { color: "#888EB0", fontSize: "12px" },
    headerRight: { display: "flex", gap: "40px", alignItems: "center" },
    filterBtn: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "12px",
      color: "#0C0E16",
      padding: "8px",
    },
    newBtn: {
      background: "#7C5DFA",
      border: "none",
      borderRadius: "24px",
      padding: "8px 16px 8px 8px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      cursor: "pointer",
    },
    btnIcon: {
      background: "white",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "18px",
      color: "#7C5DFA",
    },
    btnText: { color: "white", fontWeight: "bold", fontSize: "12px" },
    invoiceCard: {
      background: "white",
      borderRadius: "8px",
      padding: "16px 24px",
      marginBottom: "12px",
      display: "grid",
      gridTemplateColumns: "100px 120px 1fr 120px 100px 24px",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    invoiceId: { fontWeight: "bold", fontSize: "12px", color: "#0C0E16" },
    invoiceIdSpan: { color: "#7E88C3" },
    invoiceDate: { color: "#7E88C3" },
    invoiceName: { color: "#858BB2" },
    invoiceTotal: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#0C0E16",
      textAlign: "right",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px 18px",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "12px",
      textTransform: "capitalize",
      width: "104px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "white",
      borderRadius: "8px",
      padding: "32px",
      maxWidth: "500px",
      width: "90%",
    },
    modalTitle: { fontSize: "24px", fontWeight: "bold", marginBottom: "16px" },
    modalText: { color: "#888EB0", marginBottom: "24px", lineHeight: 1.5 },
    modalButtons: { display: "flex", justifyContent: "flex-end", gap: "12px" },
    button: {
      padding: "12px 24px",
      borderRadius: "24px",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
    },
    buttonCancel: { background: "#F9FAFE", color: "#7E88C3" },
    buttonDelete: { background: "#EC5757", color: "white" },
    buttonPaid: { background: "#7C5DFA", color: "white" },
    formContainer: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      maxWidth: "600px",
      background: "white",
      zIndex: 1000,
      overflowY: "auto",
      padding: "48px",
      boxShadow: "-20px 0 30px rgba(0,0,0,0.1)",
    },
    formGroup: { marginBottom: "20px" },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      fontSize: "12px",
      color: "#7E88C3",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #DFE3FA",
      borderRadius: "4px",
      fontSize: "12px",
    },
    inputError: { borderColor: "#EC5757" },
    errorText: { color: "#EC5757", fontSize: "10px", marginTop: "4px" },
    formButtons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "24px",
    },
    emptyState: { textAlign: "center", padding: "80px 20px" },
    emptyIcon: { fontSize: "48px", marginBottom: "24px" },
    emptyTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "8px" },
    emptyText: { color: "#888EB0" },
  };

  if (isDark) {
    styles.mainContent.background = "#141625";
    styles.title.color = "white";
    styles.filterBtn.color = "white";
    styles.invoiceCard.background = "#1E2139";
    styles.invoiceId.color = "white";
    styles.invoiceTotal.color = "white";
    styles.modalContent.background = "#1E2139";
    styles.modalTitle.color = "white";
    styles.formContainer.background = "#1E2139";
    styles.input.background = "#252945";
    styles.input.borderColor = "#252945";
    styles.input.color = "white";
    styles.label.color = "#DFE3FA";
  }

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>INV</div>
        </div>
        <div style={styles.themeToggle} onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️" : "🌙"}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>Invoices</h1>
            <p style={styles.subtitle}>
              There are {filteredInvoices.length} total invoices
            </p>
          </div>
          <div style={styles.headerRight}>
            <select
              style={styles.filterBtn}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <button style={styles.newBtn} onClick={() => setShowForm(true)}>
              <div style={styles.btnIcon}>+</div>
              <span style={styles.btnText}>New Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoice List */}
        <div>
          {filteredInvoices.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📄</div>
              <h3 style={styles.emptyTitle}>There is nothing here</h3>
              <p style={styles.emptyText}>Create an invoice to get started</p>
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                style={styles.invoiceCard}
                onClick={() => setSelectedInvoice(invoice)}
              >
                <div style={styles.invoiceId}>
                  <span style={styles.invoiceIdSpan}>#</span>
                  {invoice.id}
                </div>
                <div style={styles.invoiceDate}>
                  Due {formatDate(invoice.paymentDue)}
                </div>
                <div style={styles.invoiceName}>{invoice.clientName}</div>
                <div style={styles.invoiceTotal}>
                  £{invoice.total.toFixed(2)}
                </div>
                <div
                  style={{
                    ...styles.statusBadge,
                    ...getStatusStyle(invoice.status),
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: getStatusStyle(invoice.status).color,
                      display: "inline-block",
                    }}
                  ></span>
                  {invoice.status}
                </div>
                <div style={{ color: "#7C5DFA" }}>→</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInvoice && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedInvoice(null)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <p style={{ color: "#7E88C3", marginBottom: "8px" }}>Status</p>
                <div
                  style={{
                    ...styles.statusBadge,
                    ...getStatusStyle(selectedInvoice.status),
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: getStatusStyle(selectedInvoice.status).color,
                      display: "inline-block",
                    }}
                  ></span>
                  {selectedInvoice.status}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{ ...styles.button, ...styles.buttonCancel }}
                  onClick={() => setShowForm(true)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonDelete }}
                  onClick={() => {
                    setInvoiceToDelete(selectedInvoice.id);
                    setShowDeleteModal(true);
                    setSelectedInvoice(null);
                  }}
                >
                  Delete
                </button>
                {selectedInvoice.status === "pending" && (
                  <button
                    style={{ ...styles.button, ...styles.buttonPaid }}
                    onClick={() => handleMarkAsPaid(selectedInvoice)}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
            <div
              style={{
                background: "#F8F8FB",
                padding: "24px",
                borderRadius: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                #{selectedInvoice.id}
              </h2>
              <p style={{ color: "#7E88C3", marginBottom: "24px" }}>
                {selectedInvoice.description || "No description"}
              </p>
              <div>
                <p>
                  <strong>Client:</strong> {selectedInvoice.clientName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedInvoice.clientEmail || "No email"}
                </p>
                <p>
                  <strong>Total:</strong> £{selectedInvoice.total.toFixed(2)}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {formatDate(selectedInvoice.paymentDue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {showForm && (
        <div style={styles.formContainer}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            New Invoice
          </h2>
          <form onSubmit={handleCreateInvoice}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Client Name *</label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(formErrors.clientName ? styles.inputError : {}),
                }}
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
              />
              {formErrors.clientName && (
                <div style={styles.errorText}>{formErrors.clientName}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Client Email *</label>
              <input
                type="email"
                style={{
                  ...styles.input,
                  ...(formErrors.clientEmail ? styles.inputError : {}),
                }}
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
              />
              {formErrors.clientEmail && (
                <div style={styles.errorText}>{formErrors.clientEmail}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(formErrors.description ? styles.inputError : {}),
                }}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {formErrors.description && (
                <div style={styles.errorText}>{formErrors.description}</div>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Total Amount (£) *</label>
              <input
                type="number"
                step="0.01"
                style={{
                  ...styles.input,
                  ...(formErrors.total ? styles.inputError : {}),
                }}
                value={formData.total}
                onChange={(e) =>
                  setFormData({ ...formData, total: e.target.value })
                }
              />
              {formErrors.total && (
                <div style={styles.errorText}>{formErrors.total}</div>
              )}
            </div>
            <div style={styles.formButtons}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonCancel }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.buttonPaid }}
              >
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowDeleteModal(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Confirm Deletion</h2>
            <p style={styles.modalText}>
              Are you sure you want to delete this invoice? This action cannot
              be undone.
            </p>
            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.button, ...styles.buttonCancel }}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonDelete }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
