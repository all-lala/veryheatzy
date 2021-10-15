<template>
  <div v-if="scheduleEvent" class="line">
    <div class="day">{{ day }}</div>
    <div class="progress">
      <div
        v-for="schedule in schedulesDatas"
        :key="schedule.begin.time"
        :style="{
          left: `${schedule.begin.timeInDayPercent}%`,
          width: `${
            schedule.end.timeInDayPercent - schedule.begin.timeInDayPercent
          }%`,
        }"
        :class="[
          `mode-${schedule.begin.mode.toLowerCase()}`,
          schedule.begin.time,
          schedule.end.time,
        ]"
        class="mode"
      >
        <span class="info">
          <font-awesome-icon :icon="icon(schedule.begin.mode)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ModeEnum from "@/enums/mode.enum";
import { ScheduleEvent } from "@/models/schedule.model";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ScheduleDayComponent extends Vue {
  @Prop() day!: string;

  @Prop() scheduleEvent!: ScheduleEvent[];

  get schedulesDatas(): { begin: ScheduleEvent; end: ScheduleEvent }[] {
    const schedulesMapped = this.scheduleEvent.slice();
    if (!schedulesMapped.length || schedulesMapped[0].time != "00:00") {
      const beforeSchedule = new ScheduleEvent();
      beforeSchedule.time = "00:00";
      beforeSchedule.modeInNumber = 1;
      schedulesMapped.unshift(beforeSchedule);
    }
    if (
      !schedulesMapped.length ||
      schedulesMapped.slice(-1)[0].time != "23:59"
    ) {
      const afterSchedule = new ScheduleEvent();
      afterSchedule.time = "23:59";
      afterSchedule.modeInNumber = 1;
      schedulesMapped.push(afterSchedule);
    }

    const group: { begin: ScheduleEvent; end: ScheduleEvent }[] = [];
    schedulesMapped.forEach((sch, i) => {
      if (schedulesMapped[i + 1]) {
        group.push({ begin: sch, end: schedulesMapped[i + 1] });
      }
    });
    return group;
  }

  icon(mode: ModeEnum): string {
    switch (mode) {
      case ModeEnum.CONFORT:
        return "sun";
      case ModeEnum.ECO:
        return "leaf";
      case ModeEnum.HGEL:
        return "snowflake";
      default:
        return "";
    }
  }
}
</script>

<style>
:root {
  --icon-sun: 60;
  --icon-eco: 96;
  --icon-frost: 180;
  --icon-error: 0;
}

.line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.day {
  width: 6rem;
  color: white;
  font-weight: bold;
  font-style: italic;
}

.progress {
  flex: auto;
  height: 1.5rem;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: hsl(var(--icon-sun), 100%, 50%);
}
.mode {
  display: inline;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mode:hover {
  box-shadow: 0 2px 4px rgb(0 0 255 / 12%), 0 3px 5px rgb(0 0 255 / 24%);
}
.mode-confort {
  background-color: hsl(var(--icon-sun), 100%, 50%);
  color: rgb(75, 75, 75);
}
.mode-eco {
  background-color: hsl(var(--icon-eco), 100%, 50%);
  color: rgb(75, 75, 75);
}
.mode-hgel {
  background-color: hsl(var(--icon-frost), 100%, 50%);
  color: rgb(75, 75, 75);
}

.info {
  visibility: hidden;
}

.mode:hover .info {
  visibility: visible;
}
</style>
