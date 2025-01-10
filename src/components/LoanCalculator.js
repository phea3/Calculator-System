import React, { useState } from "react";

const LoanCalculator = () => {
  const [price, setPrice] = useState(0);
  const [tradeIn, setTradeIn] = useState(0);
  const [payment, setPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const calculateLoan = () => {
    const principal = price - tradeIn;
    let remainingBalance = principal;
    let totalMonths = 0;

    while (remainingBalance > 0) {
      totalMonths++;
      const monthlyInterest = remainingBalance * (interestRate / 100);
      const principalReduction = payment - monthlyInterest;
      remainingBalance -= principalReduction;
    }

    setMonths(totalMonths);
    setTotalSpent(totalMonths * payment);
  };

  const resetCalculator = () => {
    setPrice(0);
    setTradeIn(0);
    setPayment(0);
    setInterestRate(0);
    setMonths(0);
    setTotalSpent(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
          Loan Calculator
        </h1>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="price">
            Original Price ($)
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
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
            onChange={(e) => setTradeIn(parseFloat(e.target.value) || 0)}
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
            onChange={(e) => setPayment(parseFloat(e.target.value) || 0)}
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
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
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

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            <strong>Months to pay off:</strong> {months}
          </p>
          <p className="text-gray-700">
            <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
