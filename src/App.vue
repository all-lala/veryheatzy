<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreActions } from "./store";

@Component({})
export default class App extends Vue {
  beforeMount(): void {
    const query = this.$route.query;
    const username = query.username;
    const password = query.password;
    if (username && password) {
      this.$store
        .dispatch(StoreActions.getToken, { username, password })
        .then(() => {
          this.$store.dispatch(StoreActions.getBindings);
        });
    } else {
      this.$store.dispatch(StoreActions.getBindings);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
