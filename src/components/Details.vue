<template>
  <div>
    <h3>Event Details</h3>
    <div>Location: {{ (currEvent.location || {}).name }}</div>
    <div>Date: {{ currEvent.timestamp }}</div>
    <div>Outcome: {{ currEvent.outcome }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currEvent"]),
  },
};
</script>
