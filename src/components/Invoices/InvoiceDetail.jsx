import React from "react";
import StatusBadge from "../UI/StatusBadge";
import Button from "../common/Button";
import { formatDate, formatCurrency } from "../../utils/formatters";

const InvoiceDetail = ({
  invoice,
  onEdit,
  onDelete,
  onMarkAsPaid,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div>
                <p className="text-[#7E88C3] mb-1">Status</p>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="flex gap-2 md:hidden">
                <Button variant="secondary" onClick={() => onEdit(invoice)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(invoice.id)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="secondary" onClick={() => onEdit(invoice)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(invoice.id)}>
                Delete
              </Button>
              {invoice.status !== "paid" && invoice.status !== "draft" && (
                <Button variant="primary" onClick={() => onMarkAsPaid(invoice)}>
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>

          <div className="bg-[#F8F8FB] dark:bg-dark-100 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div>
                <h2 className="font-bold text-xl mb-2">
                  <span className="text-[#7E88C3]">#</span>
                  {invoice.id}
                </h2>
                <p className="text-[#7E88C3]">{invoice.description}</p>
              </div>
              <div className="text-left md:text-right">
                <p>{invoice.senderAddress?.street}</p>
                <p>{invoice.senderAddress?.city}</p>
                <p>{invoice.senderAddress?.postCode}</p>
                <p>{invoice.senderAddress?.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-[#7E88C3] mb-2">Invoice Date</p>
                <p className="font-bold mb-4">
                  {formatDate(invoice.createdAt)}
                </p>
                <p className="text-[#7E88C3] mb-2">Payment Due</p>
                <p className="font-bold">{formatDate(invoice.paymentDue)}</p>
              </div>
              <div>
                <p className="text-[#7E88C3] mb-2">Bill To</p>
                <p className="font-bold mb-2">{invoice.clientName}</p>
                <p>{invoice.clientAddress?.street}</p>
                <p>{invoice.clientAddress?.city}</p>
                <p>{invoice.clientAddress?.postCode}</p>
                <p>{invoice.clientAddress?.country}</p>
              </div>
              <div>
                <p className="text-[#7E88C3] mb-2">Sent To</p>
                <p className="font-bold">{invoice.clientEmail}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-200 rounded-lg overflow-hidden">
              <div className="p-6">
                {invoice.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between mb-4 last:mb-0"
                  >
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-[#7E88C3] text-sm">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="font-bold">
                      {formatCurrency(item.quantity * item.price)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-[#373B53] dark:bg-dark-300 p-6 flex justify-between text-white">
                <p>Grand Total</p>
                <p className="text-xl font-bold">
                  {formatCurrency(invoice.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
