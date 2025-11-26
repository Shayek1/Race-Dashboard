import { useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function OpenF1Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useSelector(state => state.theme.mode);


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
            <div className={`grid md:grid-cols-3 gap-4 `}>
                {drivers.map(driver => (
                    <div key={driver.driver_number} className={`rounded-2xl bg-gray-50 border shadow ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-200 text-black"}`}>
                        {driver.headshot_url ? (
                            <img
                                className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border border-gray-200"
                                src={driver.headshot_url}
                                alt={driver.full_name}
                            />

                        ) : (
                            <div className={"w-20 h-20 mx-auto rounded-full bg-gray-200 mb-3"}/>
                        )}
                        <h3 className="font-semibold text-lg text-center">{driver.driver_number} {driver.full_name}</h3>
                        <p className="text-sm text-gray-500"> {driver.team_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};