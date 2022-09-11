<template>
  <div class="main">
    <div class="flexbox">
      <div class="flex1">
        <Weather class="mainchild" />
        <Player class="mainchild" />
      </div>
      <Shortlinks class="mainchild flex2" />
    </div>
    <Todo class="mainchild" />
    <Pomodoro class="mainchild" />
    <Calendar class="mainchild" />
  </div>
</template>

<script>
import Weather from "../components/Weather";
import Player from "../components/Player";
import Todo from "../components/Todo";
import Calendar from "../components/Calendar";
import Pomodoro from "../components/Pomodoro";
import Shortlinks from "../components/Shortlinks";
export default {
  name: "Home",

  components: {
    Calendar,
    Player,
    Pomodoro,
    Todo,
    Weather,
    Shortlinks,
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 35px 0 0 0;
}
.mainchild {
  max-width: calc(100% - 20px) !important;
  margin: 10px;
  border-radius: 8px !important;
  min-width: 260px;
  box-shadow: 0 0 10px 1px #888888d1 !important;
}
@media (min-width: 768px) {
  .main {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-template-rows: 100px;

    div:nth-child(1) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 4;
    }
    .mainchild:nth-child(2) {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3;
      grid-row-end: 6;
    }
    .mainchild:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .mainchild:nth-child(4) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 4;
      grid-row-end: 6;
    }
  }
}
@media (min-width: 1264px) {
  .main {
    .flexbox {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .flex1 {
        flex: 55%;
        order: 2;
      }
      .flex2 {
        flex: 40%;
        order: 1;
        height: calc(100% - 25px);
      }
    }
    div:nth-child(1) {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .mainchild:nth-child(2) {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 5;
    }
    .mainchild:nth-child(3) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 5;
    }
    .mainchild:nth-child(4) {
      grid-column-start: 3;
      grid-column-end: 4;
      grid-row-start: 3;
      grid-row-end: 5;
    }
  }
}
@media (max-width: 300px) {
  .mainchild {
    margin: 0;
  }
}
</style>
