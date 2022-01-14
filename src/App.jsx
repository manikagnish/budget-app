import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/container";
import AddButtonModal from "./components/AddButtonModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetContext";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAdddBudgetModal, setShowAdddBudgetModal] = useState();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => setShowAdddBudgetModal(true)}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expenses</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={budget.amount}
                max={budget.max}
              />
            );
          })}
        </div>
      </Container>
      <AddButtonModal
        show={showAdddBudgetModal}
        handleClose={() => setShowAdddBudgetModal()}
      />
    </>
  );
}

export default App;
