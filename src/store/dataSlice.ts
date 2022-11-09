import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../firebase";

const initialState: any = {
	entities: [],
	status: null,
	error: null,
};

export const fetchData: any = createAsyncThunk(
	"listing/fetchData",
	async (endpoint) => {
		const dbRef = ref(database);

		const resultData: any = [];

		await get(child(dbRef, `apartment/${endpoint}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();

					for (const key in data) {
						if (Object.prototype.hasOwnProperty.call(data, key)) {
							const element = {
								id: key,
								...data[key],
							};
							resultData.push(element);
						}
					}
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
		return resultData;
	}
);

export const dataSlice = createSlice({
	name: "fetchData",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchData.pending]: (state) => {
			state.status = "loading";
			state.error = null;

			state = [];
		},
		[fetchData.fulfilled]: (state, action) => {
			state.entities = [...action.payload];
			state.status = "success";
		},
		[fetchData.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.payload;

			state = [];
		},
	},
});

export default dataSlice.reducer;
