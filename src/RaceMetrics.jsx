import './App.css'
import{ Line, XAxis, YAxis, Legend, LineChart, Tooltip, ResponsiveContainer} from "recharts";
import OpenF1Drivers from "./components/OpenF1Drivers.jsx";
import {fetchRacingData} from "./data.jsx";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/themeSlice.jsx";

function RaceMetrics() {

  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const [racingData, setRacingData] = useState([]);

  useEffect(() => {
    async function loadData(){
      const data = await fetchRacingData();
      setRacingData(data);
    }
    loadData();
  }, []);

  return (
      <div className={`
  min-h-screen p-8 rounded-2xl
  ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"}
`}>
    <h1 className="text-3xl text-black-600 font-bold mb-6 text-center">F1 Race Metrics</h1>
  <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 mb-4 rounded-xl bg-black text-white"
  >
    Toggle Theme (Current: {theme})
  </button>


<div className="bg-white rounded-2xl p-6 shadow-md">
  <h2 className="text-xl font-semibold mb-4">
    Lap Time Comparison
  </h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={racingData}>
      <XAxis dataKey="lap" label={{value: "lap", position: "insideBottom", offset: -5}} />
      <YAxis label={{value: "Lap Time(s)", angle: -90, position:"insideLeft"}} />
      <Tooltip/>
      <Legend align="center" iconSize={10} />
      <Line type="monotone" dataKey="Verstappen" stroke="#3DB7E4"/>
      <Line type="monotone" dataKey="Hamilton" stroke="#FF8849"/>
      <Line type="monotone" dataKey="Norris" stroke="#69BE2B"/>
    </LineChart>
  </ResponsiveContainer>
</div>
  <OpenF1Drivers/>
</div>
  );
}

export default RaceMetrics
