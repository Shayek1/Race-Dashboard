import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RaceMetrics from './RaceMetrics.jsx'
import { Provider } from "react-redux";
import { store} from "./store/storeTheme.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
       <RaceMetrics />
   </Provider>
  </StrictMode>,
)
