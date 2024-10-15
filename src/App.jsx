import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./http";
import { ContextProvider } from "./store/ModalContext";
import { routersPath } from "./Components/RoutersPages";

function App() {
  const router = routersPath();

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default App;
