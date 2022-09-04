<template>
  <div class="todo">
    <v-timeline dense clipped>
      <v-timeline-item
        fill-dot
        class="white--text mb-12"
        :style="{ alignItems: 'center' }"
        color="orange"
        large
      >
        <template v-slot:icon>
          <span>TB</span>
        </template>
        <v-text-field
          v-model="add"
          hide-details="auto"
          placeholder="I am gonna do..."
          @keydown.enter="comment"
          class="add-input"
        ></v-text-field>

        <v-snackbar v-model="snackbar" :timeout="timeout">
          You should type something

          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <!--time picker-->
        <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              class="mx-2"
              outlined
              fab
              small
              color="teal"
              v-bind="attrs"
              v-on="on"
              v-model="time"
            >
              <v-icon color="teal">mdi-plus</v-icon>
            </v-btn>
          </template>
          <!--time picker-->
          <v-time-picker v-if="modal2" format="24hr" v-model="time" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal2 = false"> Cancel </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(time), comment()"
            >
              OK
            </v-btn>
          </v-time-picker>

          <!--end time picker-->
        </v-dialog>
      </v-timeline-item>

      <!-- to do lists-->
      <v-slide-x-transition group>
        <v-timeline-item
          v-for="(event, index) in events"
          :key="event.id"
          class="mb-4"
          :color="event.color"
          small
        >
          <v-row class="todoitem">
            <span class="time"
              ><strong>{{ event.start }}</strong></span
            >
            <v-dialog v-model="event.dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="content"
                  :style="
                    event.active
                      ? {
                          textDecoration: 'line-through',
                          color: '#888',
                        }
                      : ''
                  "
                >
                  {{ event.name }}
                </div>
              </template>

              <v-card color="grey lighten-4" min-width="300px" flat>
                <v-toolbar :color="event.color" dark>
                  <v-toolbar-title v-html="event.start"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon v-on:click="deleted(index)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <textarea
                    :style="{
                      fontSize: '18px',
                      color: '#000',
                      width: '100%',
                      height: '130px',
                      resize: 'none',
                      overflow: 'auto',
                      outline: 'none !important',
                    }"
                    v-model="event.newname"
                  ></textarea>
                </v-card-text>
                <v-card-actions>
                  <v-btn text :color="event.color" @click="checknewname(event)">
                    Ok
                  </v-btn>
                  <v-btn
                    text
                    color="secondary"
                    @click="
                      (event.dialog = false), (event.newname = event.name)
                    "
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="checkbox">
              <v-checkbox
                v-model="event.active"
                @click="checking()"
              ></v-checkbox>
            </div>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </div>
</template>

<script>
export default {
  data: () => ({
    events: [],
    add: null,
    time: "00:00",

    colors: ["blue", "green", "orange", "pink", "purple"],
    modal2: false,
    snackbar: false,
    timeout: 3000,
    nonce: 0,
  }),

  computed: {
    timeline() {
      return this.events.slice().reverse();
    },
  },
  created() {
    this.events = JSON.parse(localStorage.getItem("events")) || this.events;
    this.nonce = JSON.parse(localStorage.getItem("nonced")) || this.nonce;
  },

  methods: {
    comment() {
      if (this.add) {
        this.events.push({
          id: this.nonce++,
          name: this.add,
          newname: this.add,
          start: this.time,
          color: this.colors[Math.floor(Math.random() * 5)],
          done: false,
          dialog: false,
        });
        this.events = this.events.sort((a, b) =>
          a.start > b.start ? 1 : b.start > a.start ? -1 : 0
        );
        localStorage.setItem("events", JSON.stringify(this.events));
        localStorage.setItem("nonced", JSON.stringify(this.nonce));
        this.add = null;
      } else {
        this.snackbar = true;
      }
    },

    checking() {
      localStorage.setItem("events", JSON.stringify(this.events));
    },
    deleted(index) {
      this.events.splice(index, 1);
      localStorage.setItem("events", JSON.stringify(this.events));
    },
    checknewname(event) {
      if (event.newname) {
        (event.dialog = false), (event.name = event.newname), this.checking();
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  border: 1px solid #ccc;
  max-width: 600px;
  margin: 10px;
}
.v-timeline-item::v-deep .v-timeline-item__body {
  display: flex;
  justify-content: space-between;
}
.v-application .mb-12,
.v-application .mb-4 {
  margin-bottom: 0px !important;
}
.todoitem {
  align-items: center;
  max-width: 100%;
  position: relative;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: nowrap !important;
}
.v-timeline--dense .v-timeline-item {
  flex-direction: row-reverse !important;
  align-items: center;
}
.theme--light.v-timeline::v-deep .v-timeline-item__dot {
  background: #ffffff00;
  z-index: 0;
  box-shadow: none;
}
.checkbox {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.content {
  white-space: nowrap;
  overflow: hidden;
  padding-right: 40px;
  text-overflow: ellipsis;
}
</style>
