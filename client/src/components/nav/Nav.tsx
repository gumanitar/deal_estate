import "./nav.css";
import Button from "../btn/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

type NavProps = {
  content?: boolean;
};

export default function Nav({ content = true }: NavProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav>
      {content && (
        <>
          {user ? (
            <>
              <Button
                text="Logout"
                variant="button__accent"
                clickHandler={handleLogout}
              />
            </>
          ) : (
            <>
              <Button
                text="LogIn"
                variant="button__primary"
                clickHandler={() => navigate("/auth", { state: {formMode:"login" }})}
              />
              <Button
                text="SignUp"
                variant="button__accent"
                clickHandler={() => navigate("/auth", { state: {formMode:"signup" }})}
              />
            </>
          )}
        </>
      )}
    </nav>
  );
}
