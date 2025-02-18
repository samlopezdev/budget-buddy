import { Client, Account } from "appwrite";

// const { VITE_PROJECT_ID, VITE_ENDPOINT } = import.meta.env;
// console.log(VITE_PROJECT_ID, VITE_ENDPOINT);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID); // Project ID

const account = new Account(client);

export { account };
