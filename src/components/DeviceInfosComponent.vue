<template>
  <div class="device-info">
    <div class="header-info">
      <h2 class="alias">{{ device.alias }}</h2>
      <div class="modes">
        <font-awesome-icon
          class="icon-mode"
          icon="sun"
          :class="{ 'icon-sun': device.mode === modeEnum.CONFORT }"
          @click="changeMode(modeEnum.CONFORT)"
        />
        <font-awesome-icon
          class="icon-mode"
          icon="leaf"
          :class="{ 'icon-eco': device.mode === modeEnum.ECO }"
          @click="changeMode(modeEnum.ECO)"
        />
        <font-awesome-icon
          class="icon-mode"
          icon="snowflake"
          :class="{ 'icon-frost': device.mode === modeEnum.HGEL }"
          @click="changeMode(modeEnum.HGEL)"
        />
        <font-awesome-icon
          class="icon-mode"
          icon="power-off"
          :class="{ 'icon-error': device.mode === modeEnum.OFF }"
          @click="changeMode(modeEnum.OFF)"
        />
      </div>
      <font-awesome-icon
        class="volet"
        icon="caret-square-down"
        :class="{ open: voletIsOpen }"
        @click="toggleVolet"
      />
    </div>
    <transition name="smooth">
      <div v-if="voletIsOpen" class="content">
        <h2>Horraires</h2>
        <div class="schedules">
          <schedule-day-component
            v-for="day in days"
            :key="day.val"
            :day="day.text"
            :schedule-event="deviceScheduleEventByDay(day.val)"
            class="schedule"
          ></schedule-day-component>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import DaysEnum from "@/enums/days.enum";
import ModeEnum from "@/enums/mode.enum";
import Device from "@/models/device.model";
import { ScheduleEvent } from "@/models/schedule.model";
import { StoreActions } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import ScheduleDayComponent from "./ScheduleDayComponent.vue";

@Component({
  components: {
    ScheduleDayComponent,
  },
})
export default class DeviceInfosComponent extends Vue {
  @Prop() device!: Device;

  voletIsOpen = false;

  readonly days = [
    {
      val: DaysEnum.MONDAY,
      text: "Lundi",
    },
    {
      val: DaysEnum.TUESDAY,
      text: "Mardi",
    },
    {
      val: DaysEnum.WEDNESDAY,
      text: "Mercredi",
    },
    {
      val: DaysEnum.THURSDAY,
      text: "Jeudi",
    },
    {
      val: DaysEnum.FRIDAY,
      text: "Vendredi",
    },
    {
      val: DaysEnum.SATURDAY,
      text: "Samedi",
    },
    {
      val: DaysEnum.SUNDAY,
      text: "Dimanche",
    },
  ];

  get modeEnum(): typeof ModeEnum {
    return ModeEnum;
  }

  get modesAviables(): typeof ModeEnum {
    return ModeEnum;
  }

  changeMode(mode: ModeEnum): void {
    this.$store.dispatch(StoreActions.changeDeviceMode, {
      device: this.device,
      mode,
    });
  }

  deviceScheduleEventByDay(day: DaysEnum): ScheduleEvent[] {
    return (
      this.device.schedule.find((schedule) => schedule.day == day)?.event || []
    );
  }

  toggleVolet(): void {
    this.voletIsOpen = !this.voletIsOpen;
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

.alias {
  overflow: hidden;
}

.device-info {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.header-info {
  background-color: rgb(223, 223, 223);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  transition: all 0.3s ease;
}

.device-info:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.icon-mode {
  cursor: pointer;
}
.icon-sun {
  color: hsl(var(--icon-sun), 100%, 50%);
  filter: drop-shadow(0px 0px 1px rgb(0, 0, 0))
    drop-shadow(0px 0px 4px hsl(var(--icon-sun), 100%, 30%))
    drop-shadow(0px 0px 2px hsl(var(--icon-sun), 100%, 40%));
  transition: all 0.3s;
}
.icon-eco {
  color: hsl(var(--icon-eco), 100%, 50%);
  filter: drop-shadow(0px 0px 1px rgb(0, 0, 0))
    drop-shadow(0px 0px 4px hsl(var(--icon-eco), 100%, 30%))
    drop-shadow(0px 0px 2px hsl(var(--icon-eco), 100%, 40%));
  transition: all 0.3s;
}
.icon-frost {
  color: hsl(var(--icon-frost), 100%, 50%);
  filter: drop-shadow(0px 0px 1px rgb(0, 0, 0))
    drop-shadow(0px 0px 4px hsl(var(--icon-frost), 100%, 30%))
    drop-shadow(0px 0px 2px hsl(var(--icon-frost), 100%, 40%));
  transition: all 0.3s;
}
.icon-error {
  color: hsl(var(--icon-error), 100%, 50%);
  filter: drop-shadow(0px 0px 1px rgb(0, 0, 0))
    drop-shadow(0px 0px 4px hsl(var(--icon-error), 100%, 30%))
    drop-shadow(0px 0px 2px hsl(var(--icon-error), 100%, 40%));
  transition: all 0.3s;
}
.modes {
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;
  gap: 1rem;
  margin-left: auto;
  margin-right: 2rem;
}

.volet {
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s;
}

.volet.open {
  color: white;
  filter: drop-shadow(0px 0px 1px rgb(0, 0, 0))
    drop-shadow(0px 0px 4px hsl(var(--icon-eco), 100%, 30%))
    drop-shadow(0px 0px 2px hsl(var(--icon-eco), 100%, 40%));
  transition: all 0.3s;
}

.content {
  max-height: 500px;
  background-color: rgb(63 119 80);
  padding: 1rem;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
  transform-origin: top;
}

.content h2 {
  color: white;
}

.schedules {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.schedule {
  background-color: rgb(226, 66, 66);
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 0 0 0 0.25rem;
}

.smooth-enter-active,
.smooth-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.smooth-enter,
.smooth-leave-to {
  /*transform: scaleY(0);*/
  transition: all 0.5s ease;
  max-height: 0px;
  padding-top: 0px;
}
</style>
