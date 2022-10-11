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
            outlined
            dense
          ></v-text-field>

          <v-text-field
            class="inp"
            type="number"
            placeholder="00"
            v-model="shortBreak.time"
            :rules="restrules"
            label="Rest"
            required
            outlined
            dense
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
            outlined
            dense
          ></v-text-field>
          <v-btn
            class="ma-2 start"
            outlined
            :disabled="!valid"
            color="#12258b"
            @click="validate(), (e1 = 2)"
          >
            Start
          </v-btn>
        </v-form>
      </v-stepper-content>
      <v-stepper-content :style="{ padding: '5px' }" step="2">
        <div class="prog">
          <v-progress-circular
            :rotate="-90"
            :size="130"
            :width="5"
            :value="value"
            color="#12258b"
          >
            <div class="flex-session">
              <div class="session">{{ label }} #{{ session1 + 1 }}</div>
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
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import beepvoice from "./../assets/so-proud-notification.mp3";
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
      beep: new Audio(beepvoice),
      notification: null,
      label: "",
      play: true,
      focusrules: [
        (value) => !!value || "Required.",
        (value) => value <= 60 || "Max 120 minutes",
        (value) => value >= 5 || "Min 5 minutes",
      ],
      restrules: [
        (value) => !!value || "Required.",
        (value) => value <= 15 || "Max 15 minutes",
        (value) => value >= 1 || "Min 1 minutes",
      ],
      longrestrules: [
        (value) => !!value || "Required.",
        (value) => value <= 60 || "Max 120 minutes",
        (value) => value >= 1 || "Min 1 minutes",
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
      Notification.requestPermission();
      this.valid ? this.focusing() : (this.e1 = 1);
    },
    setnotification(done, next) {
      this.notification = new Notification("Pomodoro", {
        body: `${done} session is over it's time to ${next}`,
      });
      this.notification.onclick = () => {
        window.focus();
      };
    },
    setNextStep() {
      if (this.label === "Focus" && this.session1 < 3) {
        this.setnotification("Focus", "take a short rest");
        this.shortresting();
      } else if (this.label === "Rest") {
        this.setnotification("Rest", "focus");
        this.session1++;
        this.focusing();
      } else if (this.label === "Focus" && this.session1 === 3) {
        this.setnotification("Focus", "take a long rest");
        this.longresting();
      } else if (this.label === "Long Rest") {
        this.setnotification("Long Rest", "focus");
        this.session1 = 0;
        this.focusing();
      }
    },
    mounted(session) {
      this.timer = session * 60;
      this.interval = setInterval(() => {
        if (this.play === true) {
          this.timer--;
        }
        this.minutes = Math.ceil(this.timer / 60 - (this.timer % 60) / 60);
        this.seconds = this.timer % 60;
        this.value = this.timer / ((session * 60) / 100);
        if (this.timer === 0) {
          clearInterval(this.interval);
          this.setNextStep();
          this.beep.play();
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
        this.shortresting();
      } else if (this.label === "Long Rest") {
        this.longresting();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-stepper,
.v-sheet {
  box-shadow: none !important;
  border-radius: 0px !important;
}
.pomorodo {
  max-width: 100%;
  height: 250px;
  background-image: url("./../assets/Screenshot from 2022-09-10 23-27-01.png");
  padding: 10px;
  background-size: cover;
  background-position: center;
}
.v-form {
  width: 100%;
  display: flex;
  min-height: 110px;
  gap: 5px;
  align-items: center;
  .inp {
    width: 30%;
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
.prog {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.progress {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .v-btn:hover {
    color: #12258b;
  }
}
.flex-session {
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    font-weight: 500;
    font-size: 19px;
    color: #202020;
  }
}
.session {
  font-size: 17px;
  display: block;
  color: #202020;
  padding: 0 0 10px;
  font-weight: bold;
}
</style>
