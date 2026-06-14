package com.example.Vehicle_Rental.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Vehicle_Rental.entity.Vehicle;


public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
