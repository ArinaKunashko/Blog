<template>
    <MyModal />
</template>
    
<script>
import MyModal from '../../../components/MyModal.vue';

export default {
    middleware: ['check-auth', 'auth'],

};
</script>
    