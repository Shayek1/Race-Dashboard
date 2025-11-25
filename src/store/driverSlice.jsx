import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const chosenDrivers = [44, 4, 1];

export const fetchDrivers = createAsyncThunk(
    "drivers/fetchDrivers",
    async(_, thunkAPI) => {
        try{
            const res = await fetch("https://api.openf1.org/v1/drivers?session_key=latest");
            const data = await res.json();
            return Array.isArray(data) ? data.filter(d => chosenDrivers.includes(d.driver_number)) : [];
        } catch(err){
            return thunkAPI.rejectWithValue(err.message || "Fetch failed");
        }
    }
);

const driversSlice = createSlice({
    name: "drivers",
    initialState: { list: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDrivers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchDrivers.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; })
            .addCase(fetchDrivers.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message; });
    },
});

export default driversSlice.reducer;