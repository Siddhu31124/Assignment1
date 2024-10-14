import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./Components/http";
import { ModalContextComponent } from "./store/ModalContext";
import { routersPath } from "./Components/RoutersPages";

function App() {
  const router = routersPath();

  return (
    <ModalContextComponent>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </ModalContextComponent>
  );
}

export default App;
