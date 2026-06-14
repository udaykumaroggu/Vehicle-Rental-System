import React, { useState } from "react";
import { bookVehicle } from "../services/api";

function BookingForm({ vehicle }) {
  const [booking, setBooking] = useState({
    customerName: "",
    days: "",
    vehicleId: vehicle.id,
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const handleSubmit = (e) => {
    e.preventDefault();

    bookVehicle(booking)
      .then(() => {
        alert("✅ Booking Successful!");
        setShowPayment(true);
      })
      .catch(() => {
        alert("❌ Error booking vehicle");
      });
  };

  const totalAmount = vehicle.price * (booking.days || 0);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2c3e50",
        }}
      >
        🚗 Book {vehicle.name}
      </h2>

      <form onSubmit={handleSubmit}>
        <label><strong>👤 Customer Name</strong></label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          onChange={(e) =>
            setBooking({ ...booking, customerName: e.target.value })
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <label><strong>📅 Rental Days</strong></label>
        <input
          type="number"
          placeholder="Enter number of days"
          required
          onChange={(e) =>
            setBooking({ ...booking, days: e.target.value })
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>💰 Total Amount: ₹{totalAmount}</h3>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Confirm Booking
        </button>
      </form>

      {showPayment && (
        <div
          style={{
            marginTop: "30px",
            background: "#f4f6f9",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>💳 Payment Options</h3>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Cash</option>
          </select>

          <button
            onClick={() =>
              alert(`✅ Payment Successful using ${paymentMethod}`)
            }
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            💳 Pay Now
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingForm;