import React, { useState } from "react";

const LoanCalculator = () => {
  const [price, setPrice] = useState("");
  const [tradeIn, setTradeIn] = useState("");
  const [payment, setPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const handleNumberInput = (value, setState) => {
    // Allow valid decimal numbers and remove unnecessary leading zeros
    const sanitizedValue = value.replace(/^0+(?=\d)/, ""); // Retain "0." for decimals
    setState(sanitizedValue);
  };

  const calculateLoan = () => {
    const principal = parseFloat(price || 0) - parseFloat(tradeIn || 0);
    let remainingBalance = principal;
    let totalMonths = 0;

    while (remainingBalance > 0) {
      totalMonths++;
      const monthlyInterest =
        remainingBalance * (parseFloat(interestRate || 0) / 100);
      const principalReduction = parseFloat(payment || 0) - monthlyInterest;
      remainingBalance -= principalReduction;
    }

    setMonths(totalMonths);
    setTotalSpent(totalMonths * parseFloat(payment || 0));
  };

  const resetCalculator = () => {
    setPrice("");
    setTradeIn("");
    setPayment("");
    setInterestRate("");
    setMonths(0);
    setTotalSpent(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
          Loan Calculator
        </h1>
        <div className="mb-6 text-center">
          <p className="text-gray-700">
            <strong>Months to pay off:</strong> {months}
          </p>
          <p className="text-gray-700">
            <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="price">
            Original Price ($)
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => handleNumberInput(e.target.value, setPrice)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="tradeIn">
            Trade-in Value ($)
          </label>
          <input
            type="number"
            id="tradeIn"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tradeIn}
            onChange={(e) => handleNumberInput(e.target.value, setTradeIn)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="payment">
            Monthly Payment ($)
          </label>
          <input
            type="number"
            id="payment"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={payment}
            onChange={(e) => handleNumberInput(e.target.value, setPayment)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="interestRate">
            Monthly Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={interestRate}
            onChange={(e) => handleNumberInput(e.target.value, setInterestRate)}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={calculateLoan}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
