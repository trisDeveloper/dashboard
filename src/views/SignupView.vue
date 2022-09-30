<template>
  <div class="profilemain">
    <SignUp />
  </div>
</template>

<script>
import SignUp from "../components/SignUp";
export default {
  name: "signup",

  components: {
    SignUp,
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
