import { Client, Databases } from "appwrite";

interface TableDataProps {
  title: string;
  amount: number;
  itemId: string;
  onDelete: (itemId: string) => void;
  collectionId: string;
}

export default function TableData({ title, amount, itemId, onDelete, collectionId }: TableDataProps) {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_PROJECT_ID);

  const databases = new Databases(client);

  const deleteExpense = async () => {
    try {
        console.log(`De-lay-tay ${itemId}`);
        await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID, // databaseId
        collectionId, // collectionId
        itemId // documentId
    );

    onDelete(itemId)
    } catch (err) {
        console.error(`MAYDAY: ${err}`)
    }
    
  };

  return (
    <tr>
      <td>{title}</td>
      <td>${amount.toFixed(2)}</td>
      <td onClick={deleteExpense} id={itemId}>
        <i className="bx bxs-trash-alt trash-icon"></i>
      </td>
    </tr>
  );
}
