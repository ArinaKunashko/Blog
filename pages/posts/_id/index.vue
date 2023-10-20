<template>
  <v-card class="mx-auto" max-width="1000">
    <v-img class="align-end text-white" height="500" :src="post.imageUrl" :alt="post.imageUrl" cover>
      <v-card-title>{{ post.title }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pt-4">
      {{ post.content }}
    </v-card-subtitle>
    <v-card-text>
      <div>{{ post.shortDescription }}</div>
      <div>Last update {{ formatDate(post.updatedDate) }}</div>
    </v-card-text>
    <v-card-actions>
      <NuxtLink to="/posts">
        <v-btn color="orange">
          Back to the posts
        </v-btn>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";
import axios from "axios";


export default {
  asyncData(context) {
    axios.get("https://nuxt-blog-7ba65-default-rtdb.europe-west1.firebasedatabase.app/posts/" + context.params.postId + ".json")
      .then(response => {
        return {
          post: response.data
        }
      })
      .catch(e => context.error.e)
  },
  data() {
    return {
      postId: this.$route.params.id,
      post: {
        title: "",
        content: "",
        shortDescription: "",
        imageUrl: "",
        updatedDate: new Date().toISOString().substr(0, 10), // Устанавливаем сегодняшнюю дату

      },
      postSubmitted: false,

    }

  },

  computed: {
    ...mapGetters(["getPostById"]),
    post() {
      return this.$store.getters.getPostById(this.postId) || {};
    },
    isFormValid() {
      return this.$refs.form ? this.$refs.form.validate() : true;
    },
  },
  created() {
    if (this.$refs.form) {
      this.$refs.form.validate();
    }
    if (this.postId) {
      const post = this.$store.getters.getPostById(this.postId);
      if (post) {
        this.post = { ...post };
      }
    }
  },

  methods: {
    // Метод для форматирования даты в формат "DD.MM.YYYY"
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
}

</script>

<style scoped></style>




