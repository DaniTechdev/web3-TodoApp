import "../styles/globals.css";

//INTERNAL IMPORT
import { ToDoListProvider } from "../context/ToDolistApp";

const MyApp = ({ Component, pageProps }) => (
  <ToDoListProvider>
    <div>
      <Component {...pageProps} />
    </div>
  </ToDoListProvider>
);

export default MyApp;
