<template>
  <div>Vous disposez de {{ devicesCount }} appareils actuellement</div>
</template>

<script lang="ts">
import { StoreActions } from "@/store";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class UserInfosComponent extends Vue {
  beforeMount(): void {
    this.$store.dispatch(StoreActions.getBindings);
  }

  get devicesCount(): number {
    return this.$store.state.devices.length;
  }
}
</script>
