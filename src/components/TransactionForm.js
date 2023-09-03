import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TransactionForm = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    category: "other",
    description: "",
    amount: 0,
    type: "",
    date: selectedDate,
  });

  React.useEffect(() => {
    if (isOpen) {
      // Reset the date to the current date and time when the form opens
      setSelectedDate(new Date());
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (isNaN(amount) || amount <= 0) {
      window.alert("Amount must be a number greater than 0");
      return;
    }
    if (formData.type != "debit" && formData.type != "credit") {
      window.alert("Type must be debit or credit");
      return;
    }
    const res = await fetch("/api/transaction/add", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
      }),
    });
    const data = await res.json();
    if (data.success) {
      onClose();
    } else {
      window.alert(data.message);
    }

    // Handle form submission, e.g., send the data to your backend
    // and then close the form
    onClose();
  };
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
  };
  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-lg">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for category, description, amount, type */}
          {/* Example: */}
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="income">Income</option>
              <option value="transportation">Transportation</option>
              <option value="food">Food</option>
              <option value="utilities">Utilities</option>
              <option value="clothing">Clothing</option>
              <option value="medical">Medical</option>
              <option value="insurance">Insurance</option>
              <option value="personal">Personal</option>
              <option value="debt">Debt</option>
              <option value="savings">Savings</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Type buttons */}
          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <div className="flex justify-between">
              <button
                type="button"
                className={`${
                  formData.type === "credit"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 hover:bg-gray-400"
                } text-white px-6 py-2 rounded-xl`}
                onClick={() => handleTypeChange("credit")}
              >
                Credit
              </button>
              <button
                type="button"
                className={`${
                  formData.type === "debit"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-300 hover:bg-gray-400"
                } text-white px-6 py-2 rounded-xl`}
                onClick={() => handleTypeChange("debit")}
              >
                Debit
              </button>
            </div>
          </div>
          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border border-gray-300 rounded w-full p-2"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2">
              Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-300 rounded w-full p-2"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
export default TransactionForm;
