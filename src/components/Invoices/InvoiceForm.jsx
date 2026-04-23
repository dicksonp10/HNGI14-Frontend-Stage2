import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Input";
import { FaPlus, FaTrash } from "react-icons/fa";
import { validateInvoice, generateInvoiceId } from "../../utils/validation";

const InvoiceForm = ({ invoice, onSubmit, onClose, isDraft = false }) => {
  const [formData, setFormData] = useState({
    id: invoice?.id || generateInvoiceId(),
    createdAt: invoice?.createdAt || new Date().toISOString(),
    paymentDue: invoice?.paymentDue || "",
    description: invoice?.description || "",
    paymentTerms: invoice?.paymentTerms || 30,
    clientName: invoice?.clientName || "",
    clientEmail: invoice?.clientEmail || "",
    status: invoice?.status || (isDraft ? "draft" : "pending"),
    senderAddress: invoice?.senderAddress || {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: invoice?.clientAddress || {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: invoice?.items || [{ name: "", quantity: 1, price: 0, total: 0 }],
  });

  const [errors, setErrors] = useState({});

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "price") {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }

    const newTotal = calculateTotal(newItems);
    setFormData({ ...formData, items: newItems, total: newTotal });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 1, price: 0, total: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const newTotal = calculateTotal(newItems);
    setFormData({ ...formData, items: newItems, total: newTotal });
  };

  const handleSubmit = (e, status) => {
    e.preventDefault();
    const submissionData = { ...formData, status };
    const validationErrors = validateInvoice(submissionData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const paymentDueDate = new Date();
    paymentDueDate.setDate(paymentDueDate.getDate() + formData.paymentTerms);

    onSubmit({
      ...submissionData,
      paymentDue: paymentDueDate.toISOString(),
      total: calculateTotal(formData.items),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-200 rounded-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#0C0E16] dark:text-white mb-6">
          {invoice ? `Edit #${invoice.id}` : "New Invoice"}
        </h2>

        <form onSubmit={(e) => handleSubmit(e, formData.status)}>
          {/* Sender Address */}
          <div className="mb-6">
            <h3 className="text-purple-600 font-bold mb-4">Bill From</h3>
            <Input
              label="Street Address"
              value={formData.senderAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  senderAddress: {
                    ...formData.senderAddress,
                    street: e.target.value,
                  },
                })
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.senderAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Post Code"
                value={formData.senderAddress.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Country"
                value={formData.senderAddress.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    senderAddress: {
                      ...formData.senderAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Client Address */}
          <div className="mb-6">
            <h3 className="text-purple-600 font-bold mb-4">Bill To</h3>
            <Input
              label="Client's Name"
              required
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              error={errors.clientName}
            />
            <Input
              label="Client's Email"
              type="email"
              required
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
              }
              error={errors.clientEmail}
            />
            <Input
              label="Street Address"
              value={formData.clientAddress.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientAddress: {
                    ...formData.clientAddress,
                    street: e.target.value,
                  },
                })
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.clientAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Post Code"
                value={formData.clientAddress.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      postCode: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Country"
                value={formData.clientAddress.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientAddress: {
                      ...formData.clientAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                error={errors.description}
                placeholder="e.g. Graphic Design"
              />
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold">
                  Payment Terms
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentTerms: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-3 border rounded-lg dark:bg-dark-300 dark:border-gray-700 dark:text-white"
                >
                  <option value={1}>Net 1 Day</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={14}>Net 14 Days</option>
                  <option value={30}>Net 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-4">
              Item List
            </h3>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.5fr] gap-3 mb-3 items-center"
              >
                <Input
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  error={errors[`item_${index}_name`]}
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                  error={errors[`item_${index}_quantity`]}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value) || 0)
                  }
                  error={errors[`item_${index}_price`]}
                />
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    £{(item.quantity * item.price).toFixed(2)}
                  </span>
                  <FaTrash
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="w-full bg-gray-100 dark:bg-dark-300 hover:bg-gray-200 dark:hover:bg-dark-100 p-3 rounded-3xl font-bold text-gray-600 dark:text-gray-400 transition-colors mt-3"
            >
              <FaPlus className="inline mr-2" /> Add New Item
            </button>
            {errors.items && (
              <p className="text-red-500 text-xs mt-2">{errors.items}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            {!invoice && (
              <Button
                variant="secondary"
                onClick={(e) => handleSubmit(e, "draft")}
              >
                Save as Draft
              </Button>
            )}
            <Button variant="primary" type="submit">
              {invoice ? "Save Changes" : "Save & Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
