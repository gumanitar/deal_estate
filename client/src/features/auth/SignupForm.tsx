import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "../../components/btn/Button";

import useAuth from "./useAuth";

export default function SignupForm({
  switchHandler,
  mode,
}: {
  switchHandler: () => void;
  mode: string;
}) {
  const {
    inputHandler,
    submitHandler,
    validationErrors,
    authorizationErrors,
    authorizationMsg,
  } = useAuth(mode);
  return (
    <>
      <h2 className="title">Sign Up</h2>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={(e) => inputHandler(e)}
          isInvalid={!!validationErrors?.name}
        />
        {validationErrors?.name && (
          <Form.Control.Feedback type="invalid">
            {validationErrors.name}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={(e) => inputHandler(e)}
          isInvalid={!!validationErrors?.email}
        />
        {validationErrors?.email && (
          <Form.Control.Feedback type="invalid">
            {validationErrors.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => inputHandler(e)}
          isInvalid={!!validationErrors?.password}
        />
        {validationErrors?.password && (
          <Form.Control.Feedback type="invalid">
            {validationErrors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {authorizationErrors && (
        <div className="auth-message error-msg">{authorizationErrors}</div>
      )}

      {authorizationMsg && (
        <div className="auth-message">{authorizationMsg}</div>
      )}

      <Button
        text="Sign Up"
        variant="button__accent"
        clickHandler={submitHandler}
      />
      <div className="auth-info">
        Have an account?{" "}
        <button className="button__auth" onClick={switchHandler}>
          Log in
        </button>
      </div>
    </>
  );
}
