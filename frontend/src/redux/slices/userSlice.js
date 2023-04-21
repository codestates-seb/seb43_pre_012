import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
