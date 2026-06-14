package com.example.Vehicle_Rental.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Vehicle_Rental.entity.Booking;
import com.example.Vehicle_Rental.entity.Vehicle;
import com.example.Vehicle_Rental.repo.BookingRepository;
import com.example.Vehicle_Rental.repo.VehicleRepository;

@RestController
@CrossOrigin("http://localhost:3000/")
public class VehicleController {
	@Autowired
	VehicleRepository vehicleRepo;
	@Autowired
	BookingRepository bookingRepo;

	// GET VEHICLES
	@GetMapping("/vehicles")
	public List<Vehicle> getVehicles() {
		return vehicleRepo.findAll();
	}

	// BOOK VEHICLE
	@PostMapping("/book")
	public Booking bookVehicle(@RequestBody Booking booking) {
		Booking savedBooking = bookingRepo.save(booking);
		return savedBooking;
	}

	@PostMapping("/payment")
	public String processPayment(@RequestBody Map<String, Object> payment) {
		System.out.println("Payment Received: " + payment);
		return "Payment Success";
	}
}
