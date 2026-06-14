package com.example.Vehicle_Rental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Vehicle_Rental.entity.Vehicle;
import com.example.Vehicle_Rental.repo.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    VehicleRepository repo;

    public List<Vehicle> getVehicles(){
        return repo.findAll();
    }

}
