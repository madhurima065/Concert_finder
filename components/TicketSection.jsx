function TicketSection({ tickets }) {

  return (
    <>
      <h2 className="section-title">
        Ticket Categories
      </h2>

      <div className="ticket-box">
        🥈 Silver
        <br />
        ₹{tickets.silver}
      </div>

      <div className="ticket-box">
        🥇 Gold
        <br />
        ₹{tickets.gold}
      </div>

      <div className="ticket-box">
        💎 Platinum
        <br />
        ₹{tickets.platinum}
      </div>

      <div className="ticket-box">
        👑 VIP
        <br />
        ₹{tickets.vip}
      </div>
    </>
  );
}

export default TicketSection;