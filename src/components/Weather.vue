<template>
  <div
    class="widget"
    :style="
      hours >= 5 && hours < 18
        ? { backgroundImage: `url('${morningsky}')` }
        : { backgroundImage: `url('${nightsky}')` }
    "
  >
    <!-- :style="{minutes > 34 ? backgroundImage: 'url('+ morningsky +')' : backgroundImage: 'url('+ nightsky +')' }" -->

    <div class="weather">
      <div class="desc" v-if="weather.main != undefined">
        {{ weather.weather[0].description }}
      </div>
      <div class="degree" v-if="weather.main != undefined">
        <div class="img">
          <img
            :src="
              'http://openweathermap.org/img/wn/' +
              weather.weather[0].icon +
              '.png'
            "
            alt=""
          />
        </div>
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
              {{ weather.main ? weather.name : "city"
              }}<v-icon
                :style="{ color: 'white', fontSize: '18px', bottom: '2px' }"
                >mdi-map-marker</v-icon
              >
            </div>
          </template>

          <v-card>
            <v-card-text :style="{ paddingTop: '15px' }">
              <v-autocomplete
                v-model="query"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                cache-items
                flat
                @keypress="fetchWeather()"
                hide-no-data
                hide-details
                label="select country"
                solo-inverted
              ></v-autocomplete>
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
    </div>
  </div>
</template>

<script>
//4849d7f573b8780cce0737107633f37c
import morningsky from "./../assets/skymorning.png";
import nightsky from "./../assets/nightsky.png";
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
      loading: false,
      morningsky,
      nightsky,
      items: [],
      search: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      weather: { name: "", icon: "" },
      timeout: 3500,
    };
  },
  created() {
    this.weather = JSON.parse(localStorage.getItem("weather")) || this.weather;
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      const date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.day =
        date.toLocaleDateString("en-US", { weekday: "short" }) +
        " " +
        date.toLocaleDateString("en-US", { day: "numeric" }) +
        " " +
        date.toLocaleDateString("en-US", { month: "short" }) +
        " " +
        date.toLocaleDateString("en-US", { year: "numeric" });
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
    fetchWeather() {
      this.saveWeather();
    },
    checking() {
      localStorage.setItem("weather", JSON.stringify(this.weather));
    },
    setResults(results) {
      this.weather = results;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget {
  display: flex;
  flex-wrap: nowrap;
  height: 120px;
  max-width: 350px;
  min-width: 260px;
  border-radius: 8px;
  justify-content: space-between;
  background-image: url("./../assets/skymorning.png");
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 10px;
  color: white;
  transition: all 1s;
  text-shadow: 0 0 3px #00467eb0;
  padding: 10px;
  .time {
    min-width: 40%;
    padding: 0 0 0 10px;
    text-align: right;
    .clock {
      font-size: 37px;
      font-weight: 500;
      transform: translateY(-6px);
      height: 40px;
    }
    .day {
      font-size: 13px;
      color: #ffffff;
      font-weight: 500;
      padding: 3px 3px 8px 3px;
    }
  }
  .weather {
    min-width: 50%;
    display: flex;
    flex-direction: column;
    .degree {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding-left: 5px;
      .img {
        width: 60px;
        order: 2;
        img {
          width: 60px;
        }
      }
      .deg {
        font-size: 30px;
        font-weight: 500;
      }
    }
    .desc {
      padding-left: 5px;
      font-weight: 500;
    }
  }
  .city {
    padding-left: 5px;
    font-size: 14px;
    color: #ffffff;
  }
  .v-card {
    padding: 20px;
  }
}
</style>
