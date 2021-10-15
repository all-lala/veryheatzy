import axios, { AxiosRequestConfig } from "axios";
import {
  BindingResponse,
  DeviceResponse,
  LoginResponse,
  ScheduleResponse,
} from "../types/heatzy.types";

class RoutesApi {
  static login = "login";
  static bindings = "bindings";
  static device_monitoring = (did: string) => `devdata/${did}/latest`;
  static devices = (did: string) => `devices/${did}`;
  static control = (did: string) => `control/${did}`;
  static scheduler = (did: string) => `devices/${did}/scheduler`;
}

export default class HetzyApiProvider {
  static readonly BASE_HEATZY_API_URL = "http://euapi.gizwits.com/app/";
  static readonly BASE_HEATZY_API_HEADER = {
    "X-Gizwits-Application-Id": "c70a66ff039d41b4a220e198b0fcc8b3",
  };
  static readonly BASE_HEATZY_API_TOKEN_HEADER = "X-Gizwits-User-token";

  static readonly MODES_ENCODE: {
    [type: string]: { [type: string]: unknown };
  } = {
    // Matrice d'encodage des modes pour Heatzy Pilote (Gen 1)
    Heatzy: {
      OFF: { raw: [1, 1, 3] },
      ECO: { raw: [1, 1, 1] },
      HGEL: { raw: [1, 1, 2] },
      CONFORT: { raw: [1, 1, 0] },
    },
    // Matrice d'encodage des modes pour Heatzy Pilote Gen 2
    Pilote2: {
      OFF: { attrs: { mode: "stop" } },
      ECO: { attrs: { mode: "eco" } },
      HGEL: { attrs: { mode: "fro" } },
      CONFORT: { attrs: { mode: "cft" } },
    },
  };

  static readonly MODES_AVAILABLE = ["OFF", "HGEL", "ECO", "CONFORT"];

  static baseHeader(token?: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        ...HetzyApiProvider.BASE_HEATZY_API_HEADER,
      },
    };

    if (token && config.headers) {
      config.headers[HetzyApiProvider.BASE_HEATZY_API_TOKEN_HEADER] = token;
    }
    return config;
  }

  static getUrl(dest: string): string {
    return `${HetzyApiProvider.BASE_HEATZY_API_URL}${dest}`;
  }

  static login(username: string, password: string): Promise<LoginResponse> {
    const data = { username, password, lang: "en" };
    return axios
      .post(
        HetzyApiProvider.getUrl(RoutesApi.login),
        data,
        HetzyApiProvider.baseHeader()
      )
      .then((response) => response.data as LoginResponse);
  }

  static getBindings(token: string): Promise<BindingResponse> {
    return axios
      .get(
        HetzyApiProvider.getUrl(RoutesApi.bindings),
        HetzyApiProvider.baseHeader(token)
      )
      .then((response) => response.data as BindingResponse);
  }

  static getDeviceMonitoring(
    did: string,
    token: string
  ): Promise<DeviceResponse> {
    return axios
      .get(
        HetzyApiProvider.getUrl(RoutesApi.device_monitoring(did)),
        HetzyApiProvider.baseHeader(token)
      )
      .then((response) => response.data as DeviceResponse);
  }

  static setDeviceMode(
    did: string,
    token: string,
    product_name: string,
    mode: string
  ): Promise<DeviceResponse> {
    const data: unknown = HetzyApiProvider.MODES_ENCODE[product_name][mode];
    return axios
      .post(
        HetzyApiProvider.getUrl(RoutesApi.control(did)),
        data,
        HetzyApiProvider.baseHeader(token)
      )
      .then(() =>
        HetzyApiProvider.setTimeoutPromise(500).then(() =>
          HetzyApiProvider.getDeviceMonitoring(did, token)
        )
      );
  }

  static getDeviceScheduler(
    did: string,
    token: string
  ): Promise<ScheduleResponse[]> {
    return axios
      .get(
        HetzyApiProvider.getUrl(RoutesApi.scheduler(did)),
        HetzyApiProvider.baseHeader(token)
      )
      .then((response) => {
        return response.data as ScheduleResponse[];
      });
  }

  static setTimeoutPromise<T>(time: number): Promise<T> {
    return new Promise<T>((resolve) => setTimeout(resolve, time));
  }
}
