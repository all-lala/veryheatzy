export type LoginResponse = {
  uid: string; // Unique user id
  token: string; // User token
  expire_at: number; // Token expiration time (timestamp)
};

export type BindingResponse = {
  devices: DeviceResponse[]; // A group of bound devices
};

export type DeviceResponse = {
  product_key: string; // Product_key
  product_name: string; // Product name for get generation 'Heatzy' (gen1) or 'Pilote2' (gen2)
  did: string; // Device ID
  mac: string; // Device MAC address
  is_online: boolean; // Whether online
  passcode: string; // Device passcode
  host: string; // Server domain name
  port: number; // MQTT port number for M2M
  port_s: number; // MQTT SSL port number for M2M
  ws_port: number; // Websocket port number
  wss_port: number; // Websocket SSL port number
  remark: string; // Device remark
  is_disabled: boolean; // Whether is logged out
  type: string; // Device Type, Single Item Device: normal, Central Control Device: center_control, Central Control Sub Device: sub_dev
  dev_alias: string; // Device alias
  dev_label: string[]; // List of device tags, currently used for devices control via voice API
  proto_ver: string; // Protocol version number, ‘01’, ‘01_01’, ‘03’, ‘04’
  wifi_soft_version: string; // WiFi version number
  is_sandbox: boolean; // Whether connecting the sandbox environment
  role: string; // Binding role, Special user: special, Owner user: owner, Guest user: guest, Normal user: normal
  attr: {
    mode: string;
  };
};

export type ScheduleResponse = {
  attrs: { mode: string };
  created_at: string;
  date: string;
  days: string[];
  did: string;
  enabled: boolean;
  group_id: string;
  id: string;
  product_key: string;
  raw: string;
  remark: string;
  repeat: string;
  scene_id: string;
  time: string;
};
