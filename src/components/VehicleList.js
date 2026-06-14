import React, { useEffect, useState } from "react";
import { getVehicles } from "../services/api";
import BookingForm from "./BookingForm";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    getVehicles()
      .then((res) => setVehicles(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Vehicle Details
  const getVehicleDetails = (name) => {
    switch (name.toLowerCase()) {
      case "swift":
        return {
          fuel: "Petrol",
          transmission: "Manual",
          seats: 5,
          mileage: "22 km/l",
          ac: "Yes",
        };

      case "creta":
        return {
          fuel: "Diesel",
          transmission: "Automatic",
          seats: 5,
          mileage: "18 km/l",
          ac: "Yes",
        };

      case "innova":
        return {
          fuel: "Diesel",
          transmission: "Manual",
          seats: 7,
          mileage: "15 km/l",
          ac: "Yes",
        };

      default:
        return {
          fuel: "Petrol",
          transmission: "Manual",
          seats: 5,
          mileage: "20 km/l",
          ac: "Yes",
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "40px",
        }}
      >
        🚗 Vehicle Rental System
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
          gap: "25px",
        }}
      >
        {vehicles.map((v) => {
          const details = getVehicleDetails(v.name);

          return (
            <div
              key={v.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ color: "#34495e" }}>
                🚗 {v.name}
              </h2>

              <hr />

              <p>
                <strong>🚘 Vehicle Type:</strong> {v.type}
              </p>

              <p>
                <strong>⛽ Fuel Type:</strong> {details.fuel}
              </p>

              <p>
                <strong>⚙️ Transmission:</strong> {details.transmission}
              </p>

              <p>
                <strong>💺 Seating Capacity:</strong> {details.seats}
              </p>

              <p>
                <strong>🛣 Mileage:</strong> {details.mileage}
              </p>

              <p>
                <strong>❄️ AC Availability:</strong> {details.ac}
              </p>

              <p>
                <strong>💰 Price Per Day:</strong> ₹{v.price}
              </p>

              <p
                style={{
                  color: v.available ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {v.available
                  ? "✅ Available"
                  : "❌ Not Available"}
              </p>

              <button
                onClick={() => setSelectedVehicle(v)}
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "12px",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                🔵 Book Now
              </button>
            </div>
          );
        })}
      </div>

      {selectedVehicle && (
        <div style={{ marginTop: "40px" }}>
          <BookingForm vehicle={selectedVehicle} />
        </div>
      )}
    </div>
  );
}

export default VehicleList;