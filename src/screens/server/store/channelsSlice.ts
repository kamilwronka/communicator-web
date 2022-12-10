import { createSlice } from "@reduxjs/toolkit";

export const channelsSlice = createSlice({
    name: 'members',
    initialState: {},
    reducers: {
    //   init: initializeMembers,
    //   update: updateMember,
    //   hydrate: hydrateMembers,
    },
  });
  
  // Action creators are generated for each case reducer function
//   export const { init, update, hydrate } = channelsSlice.actions;
  
  export default channelsSlice.reducer;
  