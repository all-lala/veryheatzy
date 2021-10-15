import DaysEnum from "@/enums/days.enum";
import ModeEnum from "@/enums/mode.enum";

export default class Schedule {
  day: DaysEnum = DaysEnum.MONDAY;
  event: ScheduleEvent[] = [];
}

export class ScheduleEvent {
  private readonly MODE_NUMBER = [
    ModeEnum.CONFORT,
    ModeEnum.ECO,
    ModeEnum.HGEL,
  ];

  time = "00:00";
  mode: ModeEnum = ModeEnum.NON_DEFINIT;

  get timeInMinutes(): number {
    const timeArray = this.time.split(":");
    return +timeArray[0] * 60 + +timeArray[1];
  }

  set timeInMinutes(time: number) {
    const hour = (Math.floor(time / 60) + "").padStart(2, "0");
    const min = ((time % 60) + "").padStart(2, "0");
    this.time = `${hour}:${min}`;
  }

  get timeInDayPercent(): number {
    return this.timeInMinutes / 14.39;
  }

  get modeInNumber(): number {
    return this.MODE_NUMBER.indexOf(this.mode);
  }

  set modeInNumber(mode: number) {
    this.mode = this.MODE_NUMBER[mode];
  }
}
