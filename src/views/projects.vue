<template>
  <div class="container">
    <h5>All Projects</h5>
    <div v-if="message" class="alert alert-success">{{this.message}}</div>
    <div class="input-group md-form form-sm form-2 pl-0">
      <input
        type="text"
        class="form-control"
        name="searchTitle"
        placeholder="Search by title"
        v-model="searchTitle"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="page = 1; retrieveTutorials();"
        >Search</button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Update</th>
          <th v-if="currentUser.roles[0]==='ROLE_ADMIN'">Delete</th>
          <th>Info</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="projects in projectss" v-bind:key="projects.project_id">
          <td>{{projects.project_id}}</td>
          <td>{{projects.title}}</td>
          <td>{{projects.description}}</td>
          <td>
            <button class="btn-success" v-on:click="addprojects(projects.project_id)">Act/</button>
          </td>
          <td v-if="currentUser.roles[0]==='ROLE_ADMIN'">
            <button
              class="btn-warning"
              
              v-on:click="deleteprojects(projects.project_id)"
            >Delete</button>
          </td>
          <td>
            <button class="btn-info" v-on:click="updateprojects(projects.project_id)">Info</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="row">
      <!-- <button class="btn btn-success" v-on:click="">Add</button> -->
    </div>
  </div>
</template>
<script>
import ProjectService from '../services/projects';
export default {
  name: 'projectss',
  data() {
    return {
      projectss: [],
      message: '',
      INSTRUCTOR: '',
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: '',
      page: 1,
      count: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params['searchTitle'] = searchTitle;
      }

      if (page) {
        params['page'] = page - 1;
      }

      if (pageSize) {
        params['size'] = pageSize;
      }
      return params;
    },

    retrieveTutorials() {
      console.log(this.searchTitle);
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      console.log(params);

      ProjectService.retrieveAllProjects(params)
        .then((response) => {
          const { projects, totalItems } = response.data;
          this.projectss = projects;
          this.count = totalItems;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveTutorials();
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      ProjectService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addprojects() {
      this.$router.push(`/AddProject`);
    },
    updateprojects(project_id) {
      this.$router.push(`/projectHistory/${project_id}`);
    },
    deleteprojects(project_id) {
      ProjectService.deleteprojects(project_id).then(() => {
        this.retrieveTutorials();
      });
    },
  },
  created() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.table,
.container {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
