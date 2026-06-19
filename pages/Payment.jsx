import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

import Navbar from "../components/Navbar";
import { BookingContext } from "../context/BookingContext";
import { NotificationContext } from "../context/NotificationContext";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};

  const { bookEvent } = useContext(BookingContext);
  const { addNotification } = useContext(NotificationContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!booking) return;

    const amount = booking.totalAmount || 100;

    const upiLink = `upi://pay?pa=7993448760@ibl&pn=Velishala%20Madhurima&am=${amount}&cu=INR`;

    try {
      const qrImage = await QRCode.toDataURL(upiLink);
      setQr(qrImage);
    } catch (err) {
      console.error("QR Generation Error:", err);
    }
  };

  useEffect(() => {
    if (paymentMethod === "UPI") {
      generateQR();
    }
  }, [paymentMethod]);

  if (!booking) {
    return (
      <>
        <Navbar />
        <h2>No Booking Found</h2>
      </>
    );
  }

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      bookEvent(booking);

      addNotification(
        `🎟 Booking Confirmed for ${booking.title}`
      );

      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/bookings");
      }, 4000);
    }, 2500);
  };

  return (
    <>
      <Navbar />

      <div className="payment-wrapper">
        {!success ? (
          <div className="payment-card">
            <h1>Payment</h1>

            <h3>
              Amount: ₹{booking.totalAmount}
            </h3>

            <h3
              style={{
                marginTop: "25px",
                marginBottom: "15px",
              }}
            >
              Choose Payment Method
            </h3>

            <div className="payment-method-grid">
              <div
                className={`payment-method ${
                  paymentMethod === "UPI"
                    ? "active-method"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("UPI")
                }
              >
                📱
                <h4>UPI</h4>
                <p>Google Pay, PhonePe</p>
              </div>

              <div
                className={`payment-method ${
                  paymentMethod === "Credit Card"
                    ? "active-method"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "Credit Card"
                  )
                }
              >
                💳
                <h4>Card</h4>
                <p>Visa, MasterCard</p>
              </div>

              <div
                className={`payment-method ${
                  paymentMethod === "Net Banking"
                    ? "active-method"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "Net Banking"
                  )
                }
              >
                🏦
                <h4>Net Banking</h4>
                <p>All Banks</p>
              </div>

              <div
                className={`payment-method ${
                  paymentMethod === "Wallet"
                    ? "active-method"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("Wallet")
                }
              >
                👛
                <h4>Wallet</h4>
                <p>Paytm Wallet</p>
              </div>
            </div>

            {paymentMethod === "UPI" && (
              <div className="qr-section">
                <h3>Scan & Pay via UPI</h3>

                {qr ? (
                  <img
                    src={qr}
                    alt="UPI QR Code"
                    style={{
                      width: "250px",
                      height: "250px",
                      margin: "20px auto",
                      display: "block",
                    }}
                  />
                ) : (
                  <p>Generating QR...</p>
                )}

                <p>
                  Scan using Google Pay,
                  PhonePe, Paytm, BHIM UPI
                </p>

                <button
                  className="btn"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing
                    ? "Processing Payment..."
                    : "I Have Paid"}
                </button>
              </div>
            )}

            {paymentMethod &&
              paymentMethod !== "UPI" && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  <h3>
                    {paymentMethod}
                    {" "}Selected
                  </h3>

                  <button
                    className="btn"
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing
                      ? "Processing Payment..."
                      : "Pay Now"}
                  </button>
                </div>
              )}
          </div>
        ) : (
          <div className="success-card">
            <div className="success-icon">
              ✅
            </div>

            <h1>
              Payment Successful
            </h1>

            <h2>
              Booking Confirmed
            </h2>

            <p>
              🎉 Enjoy Your Concert!
            </p>

            <p>
              Booking ID:
              {" "}
              {booking.bookingId}
            </p>

            <p>
              Redirecting to My
              Bookings...
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Payment;