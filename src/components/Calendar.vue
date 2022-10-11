<template>
  <div class="calendar">
    <div height="30">
      <div class="ctitle">Calendar</div>
    </div>
    <v-sheet class="thecalendar" height="400">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :type="type"
        @click:event="showEvent"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data: () => ({
    focus: "",
    type: "month",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        name: "app start",
        start: "2022-09-10T02:00:00",
        end: "2022-09-10T04:00:00",
        timed: true,
        color: "green",
      },
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
<style scoped lang="scss">
.calendar {
  min-width: 250px;
  min-width: 260px;
  padding: 10px;
  background: #bdd8ee;
}
.theme--light.v-calendar-weekly {
  background-color: #bdd8ee;
  border-top: #b8dfff 1px solid;
  border-left: #bdd8ee 1px solid;
}
.theme--light.v-sheet {
  background-color: #bdd8ee;
  border-color: #bdd8ee;
  color: rgba(0, 0, 0, 0.87);
}
.theme--light.v-calendar-weekly::v-deep .v-calendar-weekly__day.v-outside {
  background-color: #b1cbe0;
}
.theme--light.v-calendar-weekly::v-deep
  .v-calendar-weekly__head-weekday.v-outside {
  background-color: #bdd8ee;
}
.ctitle {
  text-align: center;
  font-size: 18px !important;
  letter-spacing: 2px;
  font-family: cursive !important;
  padding-bottom: 10px !important;
}
</style>
