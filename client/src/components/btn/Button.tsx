import "./button.css";
type ButtonProps = {
  text: string;
  variant?: "button__primary" | "button__accent" | "button__plain";
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ text, variant, clickHandler }: ButtonProps) {
  return (
    <button onClick={clickHandler} className={`button ${variant}`}>
      {text}
    </button>
  );
}
