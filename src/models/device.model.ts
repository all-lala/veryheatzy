import ModeEnum from "@/enums/mode.enum";
import Schedule from "./schedule.model";

export default class Device {
  did = "";
  name = "";
  alias = "";
  mode: ModeEnum = ModeEnum.NON_DEFINIT;
  schedule: Schedule[] = [];
}
