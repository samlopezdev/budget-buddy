import { FormEvent, useEffect, useState } from "react";
import { ID, OAuthProvider, Query } from "appwrite";
import Category from "./components/Category";
import { account, databases } from "./appwrite";
import "./App.css";

interface Expense {
  itemId: string;
  expense_name: string;
  amount: number;
  $id: string;
}

export default function App() {
  const [user, setUser] = useState("");
  const [income, setIncome] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);
  const [personalExpenses, setPersonalExpenses] = useState<Expense[]>([]);
  const [housingExpenses, setHousingExpenses] = useState<Expense[]>([]);
  const [transportationExpenses, setTransportationExpenses] = useState<
    Expense[]
  >([]);
  const [foodExpenses, setFoodExpenses] = useState<Expense[]>([]);
  const [savingsExpenses, setSavingsExpenses] = useState<Expense[]>([]);
  const [debtExpenses, setDebtExpenses] = useState<Expense[]>([]);

  // Authentication
  const handleLogin = async () => {
    console.log(`Handlin login`);

    // try {
    //   await account.createOAuth2Token(
    //     OAuthProvider.Google,
    //     "http://localhost:5173/"
    //   );
    // } catch (err) {
    //   console.error('Error creating OAuth url', err)
    // }

    await account.createOAuth2Session(
      OAuthProvider.Google, // provider
      "https://budgetbuddytracker.netlify.app/" // success (optional)
      //"http://localhost:5173/fail" // failure (optional)
    );
  };

  const handleLogout = async () => {
    console.log(`Handlin logout`);
    await account.deleteSession("current");
    window.location.reload();
  };

  // Hanlde Add Expenses
  const addIncome = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const incomeItem = parseFloat(
      (form.elements.namedItem("income") as HTMLInputElement).value
    );

    try {
      e.preventDefault();
      setIncome((prev) => prev + incomeItem);

      form.reset();
    } catch (err) {
      console.error(`MAYDAY!!: ${err}`);
    }
  };

  const addHousingExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_HOUSING, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setHousingExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const addTransportationExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_TRANSPORTATION, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setTransportationExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const addFoodExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_FOOD, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setFoodExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const addSavingsExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_SAVINGS, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setSavingsExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const addPersonalExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_PERSONAL, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setPersonalExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const addDebtExpense = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const expenseName = (
      form.elements.namedItem("expenseName") as HTMLInputElement
    ).value;
    const amount = parseFloat(
      (form.elements.namedItem("amount") as HTMLInputElement).value
    );

    try {
      e.preventDefault();

      const userData = await account.get();
      const userId = userData.$id; // Get the user's unique ID

      const res = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        import.meta.env.VITE_COLLECTION_DEBT, // collectionId
        ID.unique(),
        {
          expense_name: expenseName,
          amount: amount,
          user_id: userId,
        }
      );

      setDebtExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          expense_name: expenseName,
          amount: amount,
          itemId: res.$id,
          $id: res.$id,
        },
      ]);
      form.reset();
    } catch (err) {
      console.error(`MAYDAY: ${err}`);
    }
  };

  const deleteExpense = (itemId: string) => {
    // Delete the expense from state
    setPersonalExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );

    setHousingExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );

    setTransportationExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );

    setFoodExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );

    setSavingsExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );

    setDebtExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.itemId !== itemId)
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTotalExpenses = () => {
    const totalPersonalExpenses = personalExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const totalHousingExpenses = housingExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const totalTransportationExpenses = transportationExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const totalFoodExpenses = foodExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const totalSavingsExpenses = savingsExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const totalDebtExpenses = debtExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    return (
      totalPersonalExpenses +
      totalHousingExpenses +
      totalTransportationExpenses +
      totalFoodExpenses +
      totalSavingsExpenses +
      totalDebtExpenses
    );
  };

  // Fetch USER data
  useEffect(() => {
    const getUser = async () => {
      try {
        // const secret = new URLSearchParams(window.location.search).get('secret');
        // const userId = new URLSearchParams(window.location.search).get(
        //   "userId"
        // );
        // await account.createSession(userId, secret)
        const userData = await account.get();

        setUser(userData.email);
      } catch (err) {
        console.error(`MAYDAY?: ${err}`);
      }
    };

    getUser();
  }, []);

  // Fetch ALL Data
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userData = await account.get();
        const userId = userData.$id; // Get the current user's ID

        // Fetch Personal Expenses
        const personalRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // databaseId
          import.meta.env.VITE_COLLECTION_PERSONAL, // collectionId
          [Query.equal("user_id", userId)]
        );

        setPersonalExpenses(
          personalRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );

        // Fetch Housing Expenses
        const housingRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_HOUSING,
          [Query.equal("user_id", userId)]
        );

        setHousingExpenses(
          housingRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );

        // Fetch Transportation Expenses
        const transportationRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_TRANSPORTATION,
          [Query.equal("user_id", userId)]
        );

        setTransportationExpenses(
          transportationRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );

        // Fetch Food Expenses
        const foodRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // databaseId
          import.meta.env.VITE_COLLECTION_FOOD, // collectionId
          [Query.equal("user_id", userId)]
        );

        setFoodExpenses(
          foodRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );

        // Fetch Savings Expenses
        const savingsRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // databaseId
          import.meta.env.VITE_COLLECTION_SAVINGS, // collectionId
          [Query.equal("user_id", userId)]
        );

        setSavingsExpenses(
          savingsRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );

        // Fetch Debt Expenses
        const debtRes = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID, // databaseId
          import.meta.env.VITE_COLLECTION_DEBT, // collectionId
          [Query.equal("user_id", userId)]
        );

        setDebtExpenses(
          debtRes.documents.map((doc) => ({
            expense_name: doc.expense_name,
            amount: doc.amount,
            itemId: doc.$id,
            $id: doc.$id,
          }))
        );
      } catch (err) {
        console.error(`MAYDAY ---!!: ${err}`);
      }
    };

    fetchExpenses();
  }, []);

  // Calculate Remaining Income
  useEffect(() => {
    // Runs whenever income or expenses change
    const totalExpenses = calculateTotalExpenses();
    setRemainingIncome(income - totalExpenses);
  }, [income, calculateTotalExpenses]);

  return (
    <>
      <header>
        <h1>😎💲 Budget Buddy 💲😎</h1>
        <p>
          Budget Buddy is a tool that allows you to track and organize your
          monthly expenses, giving you a clear overview of your spending. Start
          by adding your total monthly income, and Budget Buddy will help you
          monitor all your expenses, making it easier to stay on top of your
          budget and make informed financial decisions.
        </p>
        {user ? (
          <>
            <button onClick={handleLogout} className="auth-btn">
              Sign Out
            </button>
            <form onSubmit={addIncome} className="income-form">
              <input type="number" name="income" placeholder="3500" required />
              <button type="submit">Add Income</button>
            </form>
            <div className="income-info">
              <span>Total Budget: ${income.toFixed(2)}</span>
              <span
                className={
                  remainingIncome >= 0
                    ? "remaining-positive"
                    : "remaining-negative"
                }
              >
                Remaining: ${remainingIncome.toFixed(2)}
              </span>
            </div>
            <main>
              <Category
                headerTitle="Housing 🏡"
                description="Rent, Mortgage, Utilities, etc."
                expenses={housingExpenses}
                addExpense={addHousingExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_HOUSING}
              />

              <Category
                headerTitle="Transportation 🚘"
                description="Gas, Repairs, Public Transit, etc."
                expenses={transportationExpenses}
                addExpense={addTransportationExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_TRANSPORTATION}
              />

              <Category
                headerTitle="Food 🌮"
                description="Groceries, Dining Out, Meal Deliveries, etc."
                expenses={foodExpenses}
                addExpense={addFoodExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_FOOD}
              />

              <Category
                headerTitle="Debt ⛔"
                description="Credit Cards, Loan Payments,  etc."
                expenses={debtExpenses}
                addExpense={addDebtExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_DEBT}
              />

              <Category
                headerTitle="Savings 🌱"
                description="Retirement, Emergencies, Big Purchases, etc."
                expenses={savingsExpenses}
                addExpense={addSavingsExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_SAVINGS}
              />

              <Category
                headerTitle="Personal Spending 💸"
                description="Entertainment, Hobbies, Miscellaneous, etc."
                expenses={personalExpenses}
                addExpense={addPersonalExpense}
                deleteExpense={deleteExpense}
                collectionId={import.meta.env.VITE_COLLECTION_PERSONAL}
              />

              <div className="income-info">
                <span>Total Budget: ${income.toFixed(2)}</span>
                <span
                  className={
                    remainingIncome >= 0
                      ? "remaining-positive"
                      : "remaining-negative"
                  }
                >
                  Remaining: ${remainingIncome.toFixed(2)}
                </span>
              </div>
            </main>
          </>
        ) : (
          <button onClick={handleLogin} className="auth-btn">
            Sign In With Google
          </button>
        )}
      </header>

      <footer>
        <p>
          Developed by{" "}
          <a href="https://www.linkedin.com/in/samlopezdev/" target="_blank">
            Samantha Lopez
          </a>
          <br />
          Built in 48 hours for the 2025 100Devs Hackathon ♥
        </p>
        <p></p>
      </footer>
    </>
  );
}
