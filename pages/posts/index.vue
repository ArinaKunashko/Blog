<template>
   <v-container>
  <v-app class="white">
    <h2>Posts</h2>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="post in savedPosts" :key="post.id">
        <v-card>
          <v-img :src="post.imageUrl" height="200"></v-img>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
          <v-card-text>
            {{ post.shortDescription }}
          </v-card-text>
          <v-card-text>
            Last update {{ formatDate(post.updatedDate) }}
          </v-card-text>
          <v-card-actions>
            <NuxtLink :to="`/posts/${post.id}`">
              <v-btn color="primary">Watch</v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</v-container>
</template>

<script>

export default {
    computed: {
        posts() {
            // Получаем список постов из хранилища
            return this.$store.state.posts;
        },
        savedPosts() {
            return this.posts;
        },
    },
    methods: {
        // Метод для форматирования даты в формат "DD.MM.YYYY"
        formatDate(dateString) {
            if (!dateString)
                return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
    },
}
</script>