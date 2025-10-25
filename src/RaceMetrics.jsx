import './App.css'
import {racingData} from "./data.jsx";
import{ Line, XAxis, YAxis, Legend, LineChart, Tooltip, ResponsiveContainer} from "recharts";
import OpenF1Drivers from "./components/OpenF1Drivers.jsx";

function RaceMetrics() {

  return (
<div className="p-8 bg-gray-100 min-h-screen rounded-2xl">
    <h1 className="text-3xl text-black-600 font-bold mb-6 text-center">F1 Race Metrics</h1>
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
