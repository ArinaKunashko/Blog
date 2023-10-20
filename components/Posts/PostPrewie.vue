<template>
    <v-container>
        <h2>Сохраненные посты:</h2>
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
                        <NuxtLink :to="`/admin/postId/${post.id}`">
                            <v-btn color="primary">Edit</v-btn>
                        </NuxtLink>
                    </v-card-actions>
                    <v-card-actions>
                        <NuxtLink :to="`/posts/${post.id}`">
                            <v-btn color="primary">Watch</v-btn>
                        </NuxtLink>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn color="primary" @click="removePost(post.id)">Delete Post</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <my-modal v-model="modalVisible"></my-modal>
    </v-container>
</template>

<script>
import MyModal from '../../components/MyModal.vue';

export default {
    name: "PostPrewie",
    data() {
        return {
            modalVisible: false // Состояние модального окна
        };
    },
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
        openModal() {
            // Открываем модальное окно, устанавливая значение состояния
            this.modalVisible = true;
        },

        removePost(postId) {
            this.$store.dispatch("deletePost", postId)
                .then(response => {
                    // Удаление поста из отображаемого списка
                    const index = this.savedPosts.findIndex(post => post.id === postId);
                    if (index !== -1) {
                        this.savedPosts.splice(index, 1);
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        },
        // Метод для форматирования даты в формат "DD.MM.YYYY"
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
    }
}
</script>
