<template>
    <v-app>
        <v-container>
            <v-form ref="form" @submit.prevent="submitPost">
                <!-- Выбор изображения для поста -->
                <v-text-field v-model="post.imageUrl" :src="post.imageUrl" label="add image URL"></v-text-field>
                <!-- Ввод заголовка поста -->
                <v-text-field label="Title" v-model="post.title" required :rules="titleRules"></v-text-field>
                <!-- Ввод содержимого поста -->
                <v-textarea label="Content" v-model="post.content" required :rules="contentRules"></v-textarea>
                <v-textarea label="Short Description" v-model="post.shortDescription"
                    :rules="shortDescriptionRules"></v-textarea>
                <!-- Кнопка для отправки поста -->

                <v-text-field v-model="post.updatedDate" label="Выберите дату" @click="openDatePicker"></v-text-field>
                <v-date-picker @input="closeDatePicker" no-title v-show="isDatePickerOpen" v-model="post.updatedDate"
                    label="Select Date"  :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
                <!-- <v-date-picker v-model="post.updatedDate" label="Select Date" @input="updatedDate"
                    :max="new Date().toISOString().substr(0, 10)"></v-date-picker> -->
                <v-btn color="primary" type="submit" :disabled="!isFormValid">Save</v-btn>
                <v-btn color="primary" @click="cancelEdit">Cancel</v-btn>
            </v-form>
        </v-container>
    </v-app>
</template>
  
<script>
import { mapGetters } from "vuex";
import axios from "axios";


export default {
    middleware: ['check-auth', 'auth'],
    asyncData(context) {
        axios.get(process.env.baseUrl + "/posts/" + context.params.postId + ".json")
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
            titleRules: [
                (v) => !!v || "Title is required",
                (v) => (v && v.length <= 50) || "Title must be less than 50 characters",
            ],
            contentRules: [
                (v) => !!v || "Content is required",
                (v) => (v && v.length <= 255) || "Content must be less than 255 characters",
            ],
            shortDescriptionRules: [
                (v) => (v && v.length <= 100) || "Short Description must be less than 100 characters",
            ],
            isDatePickerOpen: false,

        }

    },
    computed: {
        ...mapGetters(["getPostById"]),
        imageUrl() {
            return URL.createObjectURL(this.post.imageUrl);
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
        submitPost() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch("updatePost", this.post);
                this.$router.push("/admin");
            }
        },
        cancelEdit() {
            this.$router.push("/admin");
        },
        openDatePicker() {
            this.isDatePickerOpen = true;
        },
        closeDatePicker() {
            this.isDatePickerOpen = false;
        },
    },
};
</script>
  