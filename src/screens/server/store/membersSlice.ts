import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  [key: string]: Member[];
};

type Member = {
  id: string;
  status?: 'online' | 'offline' | 'afk';
  avatar: string;
  username: string;
};

type InitActionPayload = {
  serverId: string;
  members: Member[];
};

type UpdateMemberPayload = {
  serverId: string;
  member: Omit<Member, 'avatar' | 'username'>;
};

type HydrateMembersPayload = {
  serverId: string;
  members: Member[];
};

const initializeMembers: CaseReducer<
  State,
  PayloadAction<InitActionPayload>
> = (state, action) => {
  const { serverId, members } = action.payload;

  state[serverId] = members;

  return state;
};

const updateMember: CaseReducer<State, PayloadAction<UpdateMemberPayload>> = (
  state,
  action,
) => {
  const {
    member: { status },
    serverId,
  } = action.payload;

  state[serverId] = state[serverId].map(member => ({ ...member, status }));

  return state;
};

const hydrateMembers: CaseReducer<
  State,
  PayloadAction<HydrateMembersPayload>
> = (state, action) => {
  const { serverId, members } = action.payload;

  state[serverId] = state[serverId].map(member => {
    const updatedMember = members.find(e => e.id === member.id);

    if (updatedMember && updatedMember.status) {
      return { ...member, status: updatedMember.status };
    }

    return member;
  });
};

export const membersSlice = createSlice({
  name: 'members',
  initialState: {},
  reducers: {
    init: initializeMembers,
    update: updateMember,
    hydrate: hydrateMembers,
  },
});

// Action creators are generated for each case reducer function
export const { init, update, hydrate } = membersSlice.actions;

export default membersSlice.reducer;
