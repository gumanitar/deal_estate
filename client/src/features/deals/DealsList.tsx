import { useGetDealsQuery } from "./dealsApiSlice";

export default function DealsList() {
  const { data: dealsList } = useGetDealsQuery();

  return (
    <div className="deals-container">
      {dealsList?.map((deal, index) => (
        <a
          href="#"
          className="deal-card"
          key={index}
          style={{ backgroundImage: `url(images/${deal.img}.png)` }}
        >
          <h4 className="deal-name">{deal.name}</h4>
          <div className="deal-details">
            <p>{deal.price} Dhs</p>
            <p> Tiket - {deal.tiket} Dhs</p>
            <p> Yield {deal.yield}</p>
            <p> Sold {deal.sold} %</p>
            <p> Days left {deal.daysLeft}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
