import React, { useState } from "react";
import axios from "axios";

function PaymentPage({ booking, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handlePayment = async () => {
    setLoading(true);

    const paymentData = {
      amount: booking.price,
      method: paymentMethod,
      bookingId: booking.id,
      customerName: booking.customerName,
      vehicleName: booking.vehicleName,
      paymentDate: new Date().toISOString()
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/payment",
        paymentData
      );

      setStatus("Payment Successful ✅");

      alert(
        `Transaction ID: ${
          response.data.transactionId || "TXN" + Date.now()
        }`
      );

      onSuccess();
    } catch (error) {
      setStatus("Payment Failed ❌");
      alert("Payment Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>💳 Payment Gateway</h2>

      <p>
        <b>Customer:</b> {booking.customerName}
      </p>

      <p>
        <b>Vehicle:</b> {booking.vehicleName}
      </p>

      <p>
        <b>Amount:</b> ₹{booking.price}
      </p>

      <label>Payment Method:</label>
      <br />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="card">💳 Card</option>
        <option value="upi">📱 UPI</option>
        <option value="cash">💵 Cash</option>
      </select>

      <br />
      <br />

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <br />
      <br />

      <h3>{status}</h3>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  }
};

export default PaymentPage;