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
import { StoreActions } from "@/store";

@Component({
  components: {
    LoginFormComponent,
    DeviceListComponent,
    ScheduleDayComponent,
  },
})
export default class Home extends Vue {
  beforeMount(): void {
    const query = this.$route.query;
    const username = query.username;
    const password = query.password;
    if (username && password) {
      this.$store.dispatch(StoreActions.getToken, { username, password });
    }
  }

  get token(): string {
    return this.$store.state.token;
  }
}
</script>
