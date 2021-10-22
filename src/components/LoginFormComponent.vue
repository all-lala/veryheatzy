<template>
  <form @method.prevent="valid">
    <input v-model="username" type="text" />
    <input v-model="password" type="password" />
    <button :disabled="loading" @click.prevent="valid">{{ btnMessage }}</button>
  </form>
</template>

<script lang="ts">
import { StoreActions } from "@/store";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoginFormComponent extends Vue {
  username = "";

  password = "";

  loading = false;

  get btnMessage(): string {
    return this.loading ? "Chargement" : "Valider";
  }

  /**
   * Valid form and get tocken
   */
  valid(): void {
    this.$store
      .dispatch(StoreActions.getToken, {
        username: this.username,
        password: this.password,
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
</script>

<style></style>
