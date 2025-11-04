import {  Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

export default function RequiredAurh() {
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to="/auth" replace />;
}
