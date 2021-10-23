<template>
  <ul id="list">
    <li v-for="device in devices" :key="device.did">
      <device-infos-component :device="device" />
    </li>
  </ul>
</template>

<script lang="ts">
import Device from "@/models/device.model";
import { StoreActions } from "@/store";
import { Component, Vue } from "vue-property-decorator";
import DeviceInfosComponent from "./DeviceInfosComponent.vue";

@Component({
  components: { DeviceInfosComponent },
})
export default class DeviceListComponent extends Vue {
  beforeMount(): void {
    this.$store.dispatch(StoreActions.getBindings);
  }

  get devices(): Device[] {
    return this.$store.state.devices;
  }
}
</script>

<style>
#list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
}
</style>
