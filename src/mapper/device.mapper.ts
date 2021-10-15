import ModeEnum from "@/enums/mode.enum";
import Device from "@/models/device.model";
import { DeviceResponse } from "@/types/heatzy.types";

export default class DeviceMapper {
  static readonly MODES_DECODE: {
    [type: string]: { [type: string]: ModeEnum };
  } = {
    Pilote2: {
      stop: ModeEnum.OFF,
      eco: ModeEnum.ECO,
      fro: ModeEnum.HGEL,
      cft: ModeEnum.CONFORT,
    }, // Modes pour Pilote2
    Heatzy: {
      停止: ModeEnum.OFF,
      经济: ModeEnum.ECO,
      解冻: ModeEnum.HGEL,
      舒适: ModeEnum.CONFORT,
    }, // Modes pour Pilote Gen 1
  };

  static fromDeviceResponse(
    device: Device,
    deviceResponse: DeviceResponse
  ): Device {
    if (deviceResponse.did) {
      device.did = deviceResponse.did;
    }
    if (deviceResponse.product_name) {
      device.name = deviceResponse.product_name;
    }
    if (deviceResponse.dev_alias) {
      device.alias = deviceResponse.dev_alias;
    }
    if (device.name && deviceResponse.attr?.mode) {
      device.mode = DeviceMapper.getModeRealName(
        device.name,
        deviceResponse.attr?.mode
      );
    }

    return device;
  }

  static getModeRealName(product_name: string, mode: string): ModeEnum {
    return DeviceMapper.MODES_DECODE[product_name][mode];
  }
}
