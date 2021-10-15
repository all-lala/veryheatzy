<template>
  <div class="home">
    <login-form-component />
    <div v-if="token">
      <user-infos-component />
      <device-list-component />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import UserInfosComponent from "@/components/UserInfosComponent.vue";
import DeviceListComponent from "@/components/DeviceListComponent.vue";
import ScheduleDayComponent from "@/components/ScheduleDayComponent.vue";

@Component({
  components: {
    LoginFormComponent,
    UserInfosComponent,
    DeviceListComponent,
    ScheduleDayComponent,
  },
})
export default class Home extends Vue {
  get token(): string {
    return this.$store.state.token;
  }
}
</script>
