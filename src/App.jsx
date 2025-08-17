import "./App.css";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("payments");

  // States for payments
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // States for split
  const [splitAmount, setSplitAmount] = useState("");
  const [splitPeople, setSplitPeople] = useState(2);
  const [splits, setSplits] = useState([]);

  // Add expense
  const addExpense = () => {
    if (!amount || !description) return;
    const newExpense = { amount: Number(amount), description, id: Date.now() };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDescription("");
  };

  // Split money
  const handleSplit = () => {
    if (!splitAmount || splitPeople < 2) return;
    const perPerson = (Number(splitAmount) / splitPeople).toFixed(2);
    const newSplits = Array(splitPeople).fill(perPerson);
    setSplits(newSplits);
  };

  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="app">
      <h1>💸 Expense Tracker</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "payments" ? "active" : ""}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
        <button
          className={activeTab === "splits" ? "active" : ""}
          onClick={() => setActiveTab("splits")}
        >
          Splits
        </button>
      </div>

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div className="card">
          <h2>Add Payment</h2>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={addExpense}>Add</button>

          <h3>History</h3>
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id}>
                {exp.description} — ₹{exp.amount}
              </li>
            ))}
          </ul>
          <p className="total">Total Spent: ₹{totalSpent}</p>
        </div>
      )}

      {/* Splits Tab */}
      {activeTab === "splits" && (
        <div className="card">
          <h2>Split Money</h2>
          <input
            type="number"
            placeholder="Amount to Split"
            value={splitAmount}
            onChange={(e) => setSplitAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of People"
            value={splitPeople}
            onChange={(e) => setSplitPeople(Number(e.target.value))}
          />
          <button onClick={handleSplit}>Split</button>

          {splits.length > 0 && (
            <div className="split-result">
              <h3>Each Person Pays:</h3>
              <ul>
                {splits.map((s, idx) => (
                  <li key={idx}>Person {idx + 1}: ₹{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
