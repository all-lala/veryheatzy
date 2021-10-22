<template>
  <div class="home">
    <login-form-component v-if="!token" />
    <device-list-component v-if="token" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import DeviceListComponent from "@/components/DeviceListComponent.vue";
import ScheduleDayComponent from "@/components/ScheduleDayComponent.vue";

@Component({
  components: {
    LoginFormComponent,
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
