//미션 컴플릿 화면에서 피드 이동
import { create } from 'zustand';

const missionFeedStore = create((set) => ({
  forceMission: false,
  fromMissionType: null,

  setForceMission: (value) => set({ forceMission: value }),
  setFromMissionType: (type) => set({ fromMissionType: type }),

  resetFeedFlags: () =>
    set({
      forceMission: false,
      fromMissionType: null,
    }),
}));

export default missionFeedStore;