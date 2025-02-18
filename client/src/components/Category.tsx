import { FormEvent } from "react";
import TableData from "./TableData";

interface Expense {
  itemId: string;
  expense_name: string;
  amount: number;
  $id: string;
}

interface CategoryProps {
  headerTitle: string;
  description: string
  expenses: Expense[];
  addExpense: (e: FormEvent<HTMLFormElement>) => void;
  deleteExpense: (itemId: string) => void;
  collectionId: string;
}

export default function Category({ headerTitle, description, expenses, addExpense, deleteExpense, collectionId }: CategoryProps) {
  return (
    <section className="category">
      <div className="category-info">
        <h2>{headerTitle}</h2>
        <p>{description}</p>
        <form onSubmit={addExpense}>
          <input
            type="text"
            name="expenseName"
            placeholder="Expense Name"
            required
          />
          <input type="number" name="amount" placeholder="Amount" required />

          <button type="submit">
            <i className="bx bx-plus-medical"></i>
          </button>
        </form>
      </div>

      {expenses.length ? (
        <table className="table-content">
          <thead>
            <tr>
              <td>Expense</td>
              <td>Amount</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <TableData
                key={expense.$id}
                title={expense.expense_name}
                amount={expense.amount}
                itemId={expense.$id}
                onDelete={deleteExpense}
                collectionId={collectionId}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Add an expense.</h3>
      )}
    </section>
  );
}
