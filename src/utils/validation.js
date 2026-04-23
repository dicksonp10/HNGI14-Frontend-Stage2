export const validateInvoice = (formData) => {
  const errors = {};

  if (!formData.clientName?.trim()) {
    errors.clientName = "Client name is required";
  }

  if (!formData.clientEmail?.trim()) {
    errors.clientEmail = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
    errors.clientEmail = "Invalid email format";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.items || formData.items.length === 0) {
    errors.items = "At least one item is required";
  } else {
    formData.items.forEach((item, index) => {
      if (!item.name?.trim()) {
        errors[`item_${index}_name`] = "Item name required";
      }
      if (item.quantity <= 0) {
        errors[`item_${index}_quantity`] = "Quantity must be positive";
      }
      if (item.price <= 0) {
        errors[`item_${index}_price`] = "Price must be positive";
      }
    });
  }

  return errors;
};

export const generateInvoiceId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
  const randomNum = Math.floor(Math.random() * 9000 + 1000);
  return `${randomLetter}${randomLetter2}${randomNum}`;
};
