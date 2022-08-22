<template>
  <div>
    <Pomodoro />
    <Calendar />
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import Pomodoro from "../components/Pomodoro";
export default {
  name: "Home",

  components: {
    Calendar,
    Pomodoro,
  },
};
</script>
