<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="project_id">id</label>
        <!-- <p>Message is: {{ this.tutorial.project_id }}</p> -->
        <input
          type="text"
          class="form-control"
          id="id"
          required
          v-model="project.project_id"
          name="project_id"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="project.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <input
          class="form-control"
          id="title"
          required
          v-model="project.title"
          name="title"
        />
      </div>

          <div class="form-group">
        <label for="status">Status</label>
        <input
          class="form-control"
          id="status"
          required
          v-model="project.status"
          name="status"
        />
      </div>

      <input
          class="form-control"
          type="hidden"
          id="user_creator_id"
          v-model="currentUser.id"
          name="user_creator_id"
        />

      <button @click="saveProject" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProject">Add</button>
    </div>
  </div>
</template>

<script>
import ProductsService from '../services/projects';
export default {
  name: 'add-projects',
  data() {
    return {
      project: {
        title: '',
        description: '',
        published: false,
        project_id: this.project_id,
        user_creator_id:""
      },
      submitted: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    saveProject() {
      var data = {
        title: this.project.title,
        description: this.project.description,
        project_id: this.project.project_id,
        user_creator_id:this.user_creator_id
      };
      ProductsService.createprojects(data)
        .then((response) => {
          this.project.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {});
    },

    newProject() {
      this.submitted = false;
      this.project = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>