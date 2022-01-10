<template>
  <div>
    <div>demo3</div>
    <span>{{ result }}</span>
    <br />
    <a-button @click="doGetRequest">get无参按钮</a-button><br />
    <a-button @click="doGetRestRequest">getRest按钮</a-button><br />
    <a-button @click="doGetParamRequest">get传统按钮</a-button><br />
    <a-button @click="doPostParamRequest">post传统按钮</a-button><br />
    <a-button @click="doPostJsonRequest">postJson按钮</a-button><br />
    <a-button @click="doPutParamRequest">put传统按钮</a-button><br />
    <a-button @click="doPutJsonRequest">putJson按钮</a-button><br />
    <a-button @click="doDelRequest">del无参按钮</a-button><br />
    <a-button @click="doDelRestRequest">delRest按钮</a-button><br />
    <a-button @click="doDelParamRequest">del传统按钮</a-button><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      result: "e",
    };
  },
  methods: {
    doGetRequest() {
      this.$get(this.$api.getTest).then((res) => {
        this.result = res;
      });
    },

    doGetRestRequest() {
      this.$get(this.$api.getParamTest + this.id).then((res) => {
        this.result = res;
      });
    },

    doGetParamRequest() {
      let data = {
        id: this.id,
      };
      this.$get(this.$api.getParam2Test, data).then((res) => {
        this.result = res;
      });
    },

    doPostParamRequest() {
      let data = {
        id: this.id,
      };
      this.$post(this.$api.postParamTest, data, true).then((res) => {
        this.result = res;
      });
    },

    doPostJsonRequest() {
      let data = {
        id: this.id,
      };
      this.$post(this.$api.postJsonTest, data).then((res) => {
        this.result = res;
      });
    },

    doPutParamRequest() {
      let data = {
        id: this.id,
      };
      this.$put(this.$api.putParamTest, data, true).then((res) => {
        this.result = res;
      });
    },

    doPutJsonRequest() {
      let data = {
        id: this.id,
      };
      this.$put(this.$api.putJsonTest, data).then((res) => {
        this.result = res;
      });
    },

    doDelRequest() {
      this.$delete(this.$api.delTest).then((res) => {
        this.result = res;
      });
    },

    doDelRestRequest() {
      this.$delete(this.$api.delParamTest + this.id).then((res) => {
        this.result = res;
      });
    },

    doDelParamRequest() {
      let data = {
        id: this.id,
      };
      this.$delete(this.$api.delParam2Test, data).then((res) => {
        this.result = res;
      });
    },
  },
  beforeMount() {
    // this.doGetRequest();
  },
};
</script>

<style scoped></style>
