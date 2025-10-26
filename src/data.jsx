//import {effect, useEffect, useState} from "react";

 const mockRacingData = [
 {lap: 1, Verstappen: 60.5, Hamilton: 65.0, Norris: 70.0},
 {lap: 2, Verstappen: 55.2, Hamilton: 50.0, Norris: 56.8},
 {lap: 3, Verstappen: 70.1, Hamilton: 65.0, Norris: 70.8},
 {lap: 4, Verstappen: 70.5, Hamilton: 68.3, Norris: 74.2},
 {lap: 5, Verstappen: 64.0, Hamilton: 55.9, Norris: 77.7},
 ];

export async function fetchRacingData() {
   const chosenDrivers = [
      {number: 44, key: "Hamilton"},
      {number: 4, key: "Norris"},
      {number: 1, key: "Verstappen"},
   ];

   try {
      const driverLaps = await Promise.all(
          chosenDrivers.map(async (driver) => {
             const res = await fetch(
                 "https://api.openf1.org/v1/laps?session_key=latest&driver_number=${driver.number}"
             );
             const data = await res.json();

             if (!Array.isArray(data) || data.length === 0) {
                console.error(`Error fetching data for ${driver.key}:`, data);
                return {key: driver.key, laps: mockRacingData.map(lap => ({lap: lap.lap, time: lap[driver.key]}))}; // fallback to empty array
             }

             console.log(`Data for ${driver.key}:`, data);

             return {
                key: driver.key,
                laps: data.map((lap) => ({
                   lap: lap.lap_number,
                   time: lap.lap_duration,
                })),
             };
          }),
      );

      const combine = {};
      driverLaps.forEach((driver) => {
         driver.laps.forEach((lap) => {
            if (!combine[lap.lap]) combine[lap.lap] = {lap: lap.lap};
            combine[lap.lap][driver.key] = lap.time
         });
      });

      return Object.values(combine);
   } catch(err) {
      console.error("Error fetching API, using mock data:", err)
      return mockRacingData;
   }
}