package com.example.Vehicle_Rental.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Vehicle_Rental.entity.Booking;


public interface BookingRepository extends JpaRepository<Booking, Long> {
}
