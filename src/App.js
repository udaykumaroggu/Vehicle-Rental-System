// App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [booking, setBooking] = useState({
    customerName: "",
    customerPhone: "",
    days: "",
  });

  // FETCH VEHICLES
  useEffect(() => {
    fetch("http://localhost:8080/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  // BOOK VEHICLE
  const handleBooking = async () => {
    if (!selectedVehicle) {
      alert("Please select a vehicle");
      return;
    }

    const bookingData = {
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      days: booking.days,
      vehicleId: selectedVehicle.id,
    };

    try {
      const response = await fetch("http://localhost:8080/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedVehicle.price * booking.days,
          customer: booking.customerName,
        }),
      });

      alert("Vehicle Booked Successfully!");

      console.log(data);

      setBooking({
        customerName: "",
        customerPhone: "",
        days: "",
      });

      setSelectedVehicle(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🚗 Vehicle Rental System</h1>

      <div className="vehicle-container">
        {vehicles.map((vehicle) => (
          <div
            className={`card ${
              selectedVehicle?.id === vehicle.id ? "active" : ""
            }`}
            key={vehicle.id}
          >
            <img
              src="https://via.placeholder.com/300x200?text=Vehicle"
              alt={vehicle.name}
              className="vehicle-image"
            />

            <h2>{vehicle.name}</h2>

            <p className="type">{vehicle.type}</p>

            <h3>₹ {vehicle.price} / day</h3>

            <button onClick={() => setSelectedVehicle(vehicle)}>
              Select Vehicle
            </button>
          </div>
        ))}
      </div>

      <div className="booking-box">
        <h2>Book Your Vehicle</h2>

        <input
          type="text"
          name="customerName"
          placeholder="Enter Name"
          value={booking.customerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="customerPhone"
          placeholder="Enter Phone Number"
          value={booking.customerPhone}
          onChange={handleChange}
        />

        <input
          type="number"
          name="days"
          placeholder="Rental Days"
          value={booking.days}
          onChange={handleChange}
        />

        {selectedVehicle && (
          <div className="summary">
            <p>
              Vehicle: <b>{selectedVehicle.name}</b>
            </p>

            <p>
              Total Amount: ₹
              <b>{selectedVehicle.price * (booking.days || 0)}</b>
            </p>
          </div>
        )}

        <button className="book-btn" onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default App;