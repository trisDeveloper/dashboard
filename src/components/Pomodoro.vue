<template>
  <v-stepper v-model="e1" class="pomorodo">
    <v-stepper-items :style="{ height: '100%' }">
      <h4>Pomodoro</h4>
      <v-stepper-content :style="{ padding: '24px 0' }" step="1">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="inp"
            v-model="focus.time"
            type="number"
            placeholder="00"
            :rules="focusrules"
            label="Focus"
            required
          ></v-text-field>

          <v-text-field
            class="inp"
            type="number"
            placeholder="00"
            v-model="shortBreak.time"
            :rules="restrules"
            label="Rest"
            required
          ></v-text-field>
          <v-text-field
            class="inp"
            :style="{ width: '40%', minWidth: '110px' }"
            type="number"
            placeholder="00"
            v-model="longBreak.time"
            :rules="longrestrules"
            label="Long rest"
            required
          ></v-text-field>
          <v-btn
            class="ma-2 start"
            outlined
            :disabled="!valid"
            color="indigo"
            @click="validate(), (e1 = 2)"
          >
            Start
          </v-btn>
        </v-form>
      </v-stepper-content>
      <v-stepper-content :style="{ padding: '5px' }" step="2">
        <v-progress-circular
          :rotate="-90"
          :size="130"
          :width="5"
          :value="value"
          color="indigo"
        >
          <div class="flex-session">
            <div class="session">{{ label }}</div>
            <div>
              {{ 10 > minutes ? "0" + minutes : minutes }} :
              {{ 10 > seconds ? "0" + seconds : seconds }}
            </div>
          </div>
        </v-progress-circular>
        <div class="progress">
          <v-btn icon @click="reseted" color="secondry">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
          <v-btn icon @click="play = !play" color="secondry">
            <v-icon>{{ play ? "mdi-pause" : "mdi-play-outline" }}</v-icon>
          </v-btn>
          <v-btn @click="canceld" icon color="secondry">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  data() {
    return {
      focus: {
        time: "50",
        title: "Focus",
      },
      shortBreak: {
        time: "10",
        title: "Rest",
      },
      longBreak: {
        time: "15",
        title: "Long Rest",
      },
      interval: {},
      valid: true,
      e1: 1,
      value: 100,
      timer: 0,
      minutes: 0,
      seconds: 0,
      session1: 0,
      label: "",
      play: true,
      focusrules: [
        (value) => !!value || "Required.",
        (value) => value <= 60 || "Max 120 minutes",
        (value) => value >= 25 || "Min 25 minutes",
      ],
      restrules: [
        (value) => !!value || "Required.",
        (value) => value <= 15 || "Max 15 minutes",
        (value) => value >= 3 || "Min 3 minutes",
      ],
      longrestrules: [
        (value) => !!value || "Required.",
        (value) => value <= 60 || "Max 120 minutes",
        (value) => value >= 10 || "Min 10 minutes",
      ],
    };
  },

  methods: {
    focusing() {
      this.mounted(this.focus.time);
      this.label = this.focus.title;
    },
    shortresting() {
      this.mounted(this.shortBreak.time);
      this.label = this.shortBreak.title;
    },
    longresting() {
      this.mounted(this.longBreak.time);
      this.label = this.longBreak.title;
    },
    validate() {
      this.$refs.form.validate();
      this.valid ? this.focusing() : (this.e1 = 1);
    },
    setNextStep() {
      if (this.label === "Focus" && this.session1 < 3) {
        this.shortresting();
        this.session1++;
      } else if (this.label === "Rest") {
        this.focusing();
      } else if (this.label === "Focus" && this.session1 === 3) {
        this.longresting();
      } else if (this.label === "Long Rest") {
        this.focusing();
      }
    },
    mounted(session) {
      this.timer = session * 60;
      this.interval = setInterval(() => {
        if (this.play === true) {
          this.timer--;
        }
        this.minutes = this.timer / 60 - (this.timer % 60) / 60;
        this.seconds = this.timer % 60;
        this.value = this.timer / ((session * 60) / 100);
        if (this.timer === 0) {
          clearInterval(this.interval);
          this.setNextStep();
        }
      }, 1000);
    },
    canceld() {
      clearInterval(this.interval);
      this.e1 = 1;
      this.timer = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.value = 100;
    },
    reseted() {
      this.play = false;
      clearInterval(this.interval);
      if (this.label === "Focus") {
        this.focusing();
      } else if (this.label === "Rest") {
        this.longresting();
      } else if (this.label === "Long Rest") {
        this.longresting();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pomorodo {
  margin: 10px;
  height: 30%;
  width: 300px;
  position: absolute;
  right: 0;
  border: 1px solid#ccc;
  bottom: calc(50% + 20px);
  padding: 10px;
}
.v-form {
  width: 100%;
  display: flex;
  height: 70%;
  align-items: center;
  .inp {
    width: 30%;
    padding: 10px 8px;
    position: relative;
  }
  input {
    max-width: 100%;
    border: 1px solid #e1e1e1;
    padding: 0px 0 0 10px;
    height: 30px;
    border-radius: 4px;
    &:focus-visible {
      outline: 2px solid #a5addc;
    }
  }
}
label {
  font-size: 15px;
  font-weight: bold;
  color: #202020;
}

.start {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.v-stepper__items {
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}

.v-progress-circular {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .v-btn:hover {
    color: #3f51b5;
  }
}
.flex-session {
  display: flex;
  flex-direction: column;
  div {
    font-weight: 500;
    font-size: 19px;
    color: #2a3053;
  }
}
.session {
  font-size: 17px;
  text-shadow: 0px 2px 3px #b5b5b5;
  display: block;
  color: #151b3a;
  padding: 0 0 10px;
  font-weight: bold;
}
</style>
