import { configureStore } from '@reduxjs/toolkit';

import membersReducer from 'screens/server/store/membersSlice';

export default configureStore({
  reducer: {
    members: membersReducer,
  },
});
