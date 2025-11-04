import "./deals.css";
import DealsList from "./DealsList";

export default function Deals() {

  return (
    <div className="deals-wrapper">
      <h3 className="title">Open Deals</h3>
      <DealsList />
    </div>
  );
}
