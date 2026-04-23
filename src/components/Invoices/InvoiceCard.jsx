import React from "react";
import { FaChevronRight } from "react-icons/fa";
import StatusBadge from "../UI/StatusBadge";
import { formatDate, formatCurrency } from "../../utils/formatters";

const InvoiceCard = ({ invoice, onClick }) => {
  return (
    <div
      onClick={() => onClick(invoice)}
      className="bg-white dark:bg-dark-200 rounded-lg p-4 px-6 mb-3 cursor-pointer transition-all hover:translate-x-1 hover:border-l-4 hover:border-l-purple-600 shadow-sm group"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick(invoice)}
    >
      <div className="grid grid-cols-1 md:grid-cols-[100px_120px_1fr_120px_100px_24px] gap-4 md:gap-0 items-center">
        <div className="font-bold text-[#0C0E16] dark:text-white">
          <span className="text-[#7E88C3]">#</span>
          {invoice.id}
        </div>
        <div className="text-[#7E88C3]">
          Due {formatDate(invoice.paymentDue)}
        </div>
        <div className="text-[#858BB2] dark:text-[#DFE3FA]">
          {invoice.clientName}
        </div>
        <div className="font-bold text-[15px] text-[#0C0E16] dark:text-white text-right md:text-left">
          {formatCurrency(invoice.total)}
        </div>
        <div className="flex justify-end md:justify-start">
          <StatusBadge status={invoice.status} />
        </div>
        <FaChevronRight className="text-purple-600 hidden md:block group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default InvoiceCard;
