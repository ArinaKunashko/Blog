<template>
    <div>
        <v-btn color="primary" fab dark absolute right @click="openModal" :disabled="modalVisible" style="bottom: 20px;">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <my-modal v-model="modalVisible"></my-modal>
        <PostPrewie :posts="posts" />
    </div>
</template>

<script>
import PostPrewie from '../../components/Posts/PostPrewie.vue';
import MyModal from '../../components/MyModal.vue';

export default {
    middleware: ['auth'],
    components: { PostPrewie, MyModal },
    data() {
        return {
            modalVisible: false // Состояние модального окна
        };
    },
    methods: {
        openModal() {
            // Открываем модальное окно, устанавливая значение состояния
            this.modalVisible = true;
        },
        
    },
    computed: {
        posts() {
            // Получаем список постов из хранилища
            return this.$store.state.posts;
        }
    }
}
</script>
