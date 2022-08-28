<template>
  <div class="main">
    <Todo />
    <Pomodoro />
    <!-- <Widget /> -->
    <!-- <Resources /> -->
    <!-- <Notes /> -->
    <Calendar />
  </div>
</template>

<script>
import Todo from "../components/Todo";
import Calendar from "../components/Calendar";
import Pomodoro from "../components/Pomodoro";
export default {
  name: "Home",

  components: {
    Calendar,
    Pomodoro,
    Todo,
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
@media (min-width: 768px) {
  .main {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}
</style>
