<template>
  <div class="profilemain">
    <LogIn />
  </div>
</template>

<script>
import LogIn from "../components/LogIn";
export default {
  name: "login",

  components: {
    LogIn,
  },
};
</script>
<style lang="scss" scoped>
.profilemain {
  height: 100%;
  padding: 40px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
