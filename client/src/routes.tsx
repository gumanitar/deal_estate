import { Route, Routes } from "react-router-dom";
import Auth from "./features/auth/Auth";
import Deals from "./features/deals/Deals";
import App from "./features/app/App";
import RequiredAurh from "./features/auth/RequiredAurh";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />

      <Route element={<RequiredAurh />}>
        <Route path="/deals" element={<Deals />} />
      </Route>
    </Routes>
  );
}
