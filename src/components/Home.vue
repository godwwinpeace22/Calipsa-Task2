<template>
  <div class="hello">
    <h3>EventFul</h3>

    <table style="width:100%">
      <tr>
        <th>Date</th>
        <th>Location</th>
        <th>Outcome</th>
      </tr>
      <tr v-for="item in items" :key="item.timestamp + item.location.id">
        <td @click="goTo(item)">
          {{ item.timestamp }}
        </td>
        <td>{{ item.location.name }}</td>
        <td>{{ item.outcome }}</td>
      </tr>
    </table>

    <div class="time-range">
      <div class="start-date">
        <span>Start date</span>
        <input type="date" name="date" id="date" v-model="startDate" />
        <span>Start time</span>
        <input type="time" name="time" id="start-time" v-model="startTime" />
      </div>
      <div class="end-date">
        <span>End date</span>
        <input type="date" name="end date" id="end-date" v-model="endDate" />
        <span>End time</span>
        <input type="time" name="end-time" id="end-time" v-model="endTime" />
      </div>

      <div class="outcome">
        <span>Outcome</span>
        <select name="outcome" id="outcome" v-model="outcome">
          <option value="true">True</option
          ><option value="false">False</option></select
        >
      </div>

      <button @click="filterData" id="filter-data">Filter data</button>
    </div>

    <!-- <div class="spinner" v-if="loading"></div> -->

    <div class="paginator">
      <span>Page {{ page }}</span>
    </div>
    <div class="btn-container">
      <button class="btn prev" @click="prev" :disabled="loading">
        Previous
      </button>

      <button class="btn next" @click="next" :disabled="loading">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    events: [],
    page: 1,
    loading: false,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    outcome: "",
  }),
  computed: {
    items() {
      return this.events.map((e) => {
        return {
          ...e,
          timestamp: new Date(e.timestamp).toLocaleDateString(undefined, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        };
      });
    },
  },
  methods: {
    goTo(item) {
      this.$store.dispatch("setCurrEvent", item);
      this.$router.push("/details");
    },
    getData() {
      const instance = axios.create({
        baseURL: "http://localhost:4000",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.VUE_APP_PUB_API_KEY,
        },
      });

      this.loading = true;

      const start = this.startDate
        ? this.startDate + " " + this.startTime
        : null;
      const end = this.endDate ? this.endDate + " " + this.endTime : null;

      instance
        .get(
          `/events?page=${this.page}${start ? "&start=" + start : ""}${
            end ? "&end=" + end : ""
          }${this.outcome ? "&outcome=" + this.outcome : ""}`
        )
        .then((resp) => {
          this.events = resp.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          alert("Sorry, an error occured. Please try again");
        });
    },
    filterData() {
      this.getData();
    },
    next() {
      this.page++;
      this.getData();
    },
    prev() {
      if (this.page <= 1) return;
      this.page--;
      this.getData();
    },
  },
  mounted() {
    // get data from api;
    this.getData();
  },
};
</script>

<style scoped>
h3 {
  margin: 40px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}

tr {
  cursor: pointer;
}
a {
  color: #42b983;
}
.paginator {
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}
.btn-container {
  margin-top: 15px;
}

.btn {
  cursor: pointer;
}
.prev {
  margin-right: 15px;
}

.time-range {
  margin-top: 15px;
}

.start-date {
  margin-bottom: 5px;
}

.start-date span,
.end-date span {
  margin-right: 10px;
  margin-left: 10px;
}
#filter-data {
  margin-top: 10px;
}
.outcome {
  margin: 10px 0;
}
.outcome select {
  margin-left: 5px;
}
.spinner {
  margin: 15px auto;
  border: 1px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
