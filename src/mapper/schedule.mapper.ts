import DaysEnum from "@/enums/days.enum";
import Schedule, { ScheduleEvent } from "@/models/schedule.model";
import { ScheduleResponse } from "@/types/heatzy.types";

export default class ScheduleMapper {
  static newsFromSchedulesResponses(
    schedulesResponses: ScheduleResponse[]
  ): Schedule[] {
    const schedules: Schedule[] = [];
    schedulesResponses.forEach((scheduleResponse) => {
      let schedule = schedules.find((a) => a.day === scheduleResponse.repeat);
      if (!schedule) {
        schedule = new Schedule();
        schedule.day = scheduleResponse.repeat as DaysEnum;
        schedules.push(schedule);
      }
      const scheduleEvent = new ScheduleEvent();
      scheduleEvent.time = scheduleResponse.time;
      scheduleEvent.modeInNumber = Number(scheduleResponse.attrs.mode);
      schedule.event.push(scheduleEvent);
    }, []);

    schedules.forEach((schedule) =>
      schedule.event.sort(
        (a: ScheduleEvent, b: ScheduleEvent) =>
          a.timeInMinutes - b.timeInMinutes
      )
    );
    return schedules;
  }
}
