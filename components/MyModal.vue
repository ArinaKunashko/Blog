<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Create New Post</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="createPost">
          <v-text-field v-model="post.imageUrl" label="add image URL"></v-text-field>
          <v-text-field v-model="post.title" label="Title" required :rules="titleRules"></v-text-field>
          <v-textarea v-model="post.content" label="Content" required :rules="contentRules"></v-textarea>
          <v-textarea v-model="post.shortDescription" label="Short Description"
            :rules="shortDescriptionRules"></v-textarea>
          <v-text-field v-model="post.updatedDate" label="Выберите дату" @click="openDatePicker"></v-text-field>
          <v-date-picker @input="closeDatePicker" no-title v-show="isDatePickerOpen" v-model="post.updatedDate"
            label="Select Date" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>

          <v-btn color="primary" type="submit" @click="closeModal" :disabled="!isFormValid">Create</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
import axios from 'axios';

export default {
  // middleware: ['check-auth','auth'],
  data() {
    return {
      post: {
        title: "",
        content: "",
        shortDescription: "",
        id: (function () {
          var id = Math.round(100000 - 0.5 + Math.random() * (99999999999 - 100000 + 1));
          return String(id);
        })(),
        imageUrl: "",
        updatedDate: new Date().toISOString().substr(0, 10), // Устанавливаем сегодняшнюю дату
      },
      dialog: false,
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

    };
  },
  watch: {
    value(newValue) {
      this.dialog = newValue;
    },
  },
  props: {
    value: Boolean,
  },
  methods: {
    createPost(post) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("savePost", this.post).then(() => {
          // Очищаем значения полей формы
          this.$refs.form.reset();
          // Закрываем модальное окно
          this.dialog = false;
          this.$router.push("/admin");
        });
      }
    },
    closeModal() {
      this.$emit('input', false);
    },
    openDatePicker() {
            this.isDatePickerOpen = true;
        },
    closeDatePicker() {
      this.isDatePickerOpen = false;
    },
  },
  computed: {
    isFormValid() {
      return this.$refs.form ? this.$refs.form.validate() : true;
    },

  },
};
</script>
  