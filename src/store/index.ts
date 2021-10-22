import DeviceMapper from "@/mapper/device.mapper";
import ScheduleMapper from "@/mapper/schedule.mapper";
import Device from "@/models/device.model";
import HetzyApiProvider from "@/services/heatzy.api.provider";
import { DeviceResponse } from "@/types/heatzy.types";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export enum StoreMutations {
  setToken = "setToken",
  setDevices = "setDevices",
  updateDevice = "updateDevice",
  setMode = "setMode",
  updateSchedules = "updateSchedules",
}

export enum StoreActions {
  getToken = "getToken",
  setToken = "setToken",
  getBindings = "getBindings",
  changeDeviceMode = "changeDeviceMode",
}

interface StoreState {
  token: string;
  devices: Device[];
}

export default new Vuex.Store<StoreState>({
  state: {
    token: window.localStorage.getItem("token") || "",
    devices: [],
  },
  mutations: {
    [StoreMutations.setToken](state, token: string) {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
    [StoreMutations.setDevices](state, devices: DeviceResponse[]) {
      state.devices = devices.map((device) =>
        DeviceMapper.fromDeviceResponse(new Device(), device)
      );
    },
    [StoreMutations.updateDevice](state, device: DeviceResponse) {
      state.devices = state.devices.map((dev) => {
        if (dev.did === device.did) {
          return DeviceMapper.fromDeviceResponse(dev, device);
        }
        return dev;
      });
    },
    [StoreMutations.setMode](state, payload) {
      state.devices = state.devices.map((dev) => {
        if (dev.did === payload.device.did) {
          dev.mode = payload.mode;
        }
        return dev;
      });
    },
    [StoreMutations.updateSchedules](state, payload) {
      const schedules = ScheduleMapper.newsFromSchedulesResponses(
        payload.schedules
      );
      state.devices = state.devices.map((dev) => {
        if (dev.did === payload.did) {
          dev.schedule = schedules;
        }
        return dev;
      });

      const newDevice = new Device();
      newDevice.did = payload.did;
      newDevice.schedule = schedules;
    },
  },
  actions: {
    [StoreActions.getToken](
      { dispatch },
      payload: { username: string; password: string }
    ) {
      HetzyApiProvider.login(payload.username, payload.password).then(
        (data) => {
          if (data?.token) {
            dispatch(StoreActions.setToken, data.token);
            Promise.resolve();
          } else {
            Promise.reject();
          }
        }
      );
    },
    [StoreActions.setToken]({ commit }, value) {
      commit(StoreMutations.setToken, value);
    },
    [StoreActions.getBindings]({ commit, state }) {
      HetzyApiProvider.getBindings(state.token).then((data) => {
        if (data) {
          commit(StoreMutations.setDevices, data.devices);
          data.devices.map((device) => {
            HetzyApiProvider.getDeviceMonitoring(device.did, state.token).then(
              (data) => {
                if (data) {
                  commit(StoreMutations.updateDevice, data);
                }
              }
            );
            HetzyApiProvider.getDeviceScheduler(device.did, state.token).then(
              (data) => {
                if (data) {
                  commit(StoreMutations.updateSchedules, {
                    did: device.did,
                    schedules: data,
                  });
                }
              }
            );
          });
        }
      });
    },
    [StoreActions.changeDeviceMode](
      { commit, state },
      payload: { device: Device; mode: string }
    ) {
      commit(StoreMutations.setMode, payload);
      HetzyApiProvider.setDeviceMode(
        payload.device.did,
        state.token,
        payload.device.name,
        payload.mode
      ).then((data) => {
        if (data) {
          commit(StoreMutations.updateDevice, data);
        }
      });
    },
  },
  modules: {},
});
