import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "paid":
        return "status-badge-paid";
      case "pending":
        return "status-badge-pending";
      default:
        return "status-badge-draft";
    }
  };

  return (
    <div
      className={`${getStatusClass()} inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold text-xs capitalize w-[104px] before:w-2 before:h-2 before:rounded-full before:inline-block`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
