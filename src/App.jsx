import './App.css'
import {racingData} from "./data.jsx";
import{ Line, XAxis, YAxis, Legend, LineChart, Tooltip, ResponsiveContainer} from "recharts";

function App() {

  return (
<div>
    <h1>F1 Race Metrics</h1>
<div>
  <h2>
    Lap Time Comparison
  </h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={racingData}>
      <XAxis dataKey="lap" label={{value: "lap", position: "insideBottom", offset: -5}} />
      <YAxis label={{value: "Lap Time(s)", angle: -90, position:"insideLeft"}} />
      <Tooltip/>
      <Legend/>
      <Line type="monotone" dataKey="Verstappen" stroke="#3DB7E4"/>
      <Line type="monotone" dataKey="Hamilton" stroke="#FF8849"/>
      <Line type="monotone" dataKey="Norris" stroke="#69BE2B"/>
    </LineChart>
  </ResponsiveContainer>
</div>
</div>
  );
}

export default App
