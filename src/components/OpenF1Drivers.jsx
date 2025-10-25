import { useEffect, useState} from "react";

export default function OpenF1Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const chosenDrivers = [44, 4 , 1]; //filtering data to get the drivers I want

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await fetch("https://api.openf1.org/v1/drivers?session_key=latest");
                const data = await res.json();
                console.log("OpenF1 drivers:", data);
               const filteredDrivers = data.filter(driver => chosenDrivers.includes(driver.driver_number));
                setDrivers(filteredDrivers);
            } catch (err) {
                console.error("Error fetching the OpenF1 drivers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDrivers();
    }, []);

    if (loading) return <p> Loading driver info...</p>;

    return(
        <div className = "p-4">
            <h2 className="text-xl font-bold mb-4">
                Drivers
            </h2>
            <ul>
                {drivers.map(driver => (
                    <li key={driver.driver_number}>
                        #{driver.driver_number} - {driver.full_name} ({driver.team_name})
                    </li>
                ))}
            </ul>
        </div>
    )
};