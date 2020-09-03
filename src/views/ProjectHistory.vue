<template>
  <div class="container">
    <h3>All Projects</h3>
    <div v-if="message" class="alert alert-success">{{this.message}}</div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Title</th>
            <th>Changed By User</th>
            <th>Date Changed</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="projects in projectss" v-bind:key="projects.id">
            <td>{{projects.id}}</td>
            <td>{{projects.description}}</td>
            <td>{{projects.title}}</td>
            <td>{{projects.userId}}</td>
            <td>{{projects.timeDateCreated}}</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <!-- <button class="btn btn-success" v-on:click="">Add</button> -->
      </div>
    </div>
  </div>
</template>
<script>
import ProductsService from '../services/projects';
export default {
  name: 'projectss',
  data() {
    return {
      projectss: [],
      message: '',
      INSTRUCTOR: 'page',
      id: this.$route.params.id,
    };
  },
  methods: {
    refreshprojectss(id) {
      ProductsService.retrieveProjectHistory(id).then((res) => {
        this.projectss = res.data;
      });
    },
  },
  created() {
    this.refreshprojectss(this.id);
  },
};
</script>