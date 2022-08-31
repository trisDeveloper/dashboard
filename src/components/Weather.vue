<template>
  <div class="widget">
    <div class="weather">
      <div class="city">
        <v-snackbar v-model="snackbar" :timeout="timeout">
          You should type something

          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              {{ weather.main ? weather.name : "city" }},
              {{ weather.main ? weather.sys.country : "country"
              }}<v-icon>mdi-map-marker</v-icon>
            </div>
          </template>

          <v-card>
            <v-card-text>
              <v-text-field
                label="select country"
                v-model="query"
                @keypress="fetchWeather()"
                placeholder="Search for a city or state"
              ></v-text-field>
              <!-- <ul>
                <li v-for="(result, i) in searchResults" :key="i">
                  {{ result }} // list of all places
                </li>
              </ul> -->
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="(dialog = false), saveWeather()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="desc" v-if="weather.main != undefined">
        {{ weather.weather[0].description }}
      </div>
      <div class="degree" v-if="weather.main != undefined">
        <div class="img"></div>
        <div class="deg">{{ Math.round(weather.main.temp) }}°c</div>
      </div>
    </div>
    <div class="time">
      <div class="clock">
        {{ 10 > hours ? "0" + hours : hours }}:{{
          10 > minutes ? "0" + minutes : minutes
        }}
      </div>
      <div class="day">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
// //4849d7f573b8780cce0737107633f37c

export default {
  data() {
    return {
      dialog: false,
      interval: {},
      weatherinterval: {},
      hours: 0,
      minutes: 0,
      day: "",
      snackbar: false,
      api_key: "4849d7f573b8780cce0737107633f37c",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: { name: "" },
    };
  },
  created() {
    this.weather = JSON.parse(localStorage.getItem("weather") || this.weather);
  },

  mounted() {
    this.interval = setInterval(() => {
      const date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.day =
        date.toLocaleDateString("en-US", { weekday: "long" }) +
        ", " +
        date.toLocaleDateString("en-US", { day: "numeric" }) +
        " " +
        date.toLocaleDateString("en-US", { month: "short" });
    }, 1000);
    this.weatherinterval = setInterval(() => {
      this.saveWeather(); ///// 29 new york
    }, 3600000);
  },
  methods: {
    saveWeather() {
      if (this.query) {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults)
          .then(this.checking);
      } else {
        this.snackbar = true;
      }
    },
    fetchWeather(e) {
      if (e.key == "Enter") {
        this.saveWeather();
      }
    },
    checking() {
      localStorage.setItem("weather", JSON.stringify(this.weather));
    },
    setResults(results) {
      this.weather = results;
    },
  },
};
</script>

<style lang="scss" scoped>
.widget {
  display: flex;
  flex-wrap: nowrap;
  height: 150px;
  max-width: 350px;
  min-width: 260px;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  .time {
    min-width: 40%;
    padding: 0 0 0 10px;
    text-align: right;
    .clock {
      font-size: 45px;
      font-weight: bold;
    }
    .day {
      font-size: 14px;
      color: #666;
      padding: 0 5px;
    }
  }
  .weather {
    min-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .degree {
      padding-left: 5px;
      .deg {
        font-size: 45px;
        font-weight: bold;
      }
    }
    .desc {
      padding-left: 5px;
    }
    .city {
      padding-left: 5px;
      font-size: 15px;
      color: #666;
    }
  }
  .v-card::v-deep .v-card__text {
    padding: 24px 20px;
  }
}
</style>
