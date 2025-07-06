import Home from '@/app/dashboard/page'
import { Toaster } from "react-hot-toast";
export default function RootPage() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Home />

    </>
  );
}
