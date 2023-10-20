<template>
    <v-tabs align-tabs="center" centered align-center justify-center>

        <v-tab @click="linkToPosts">
                Blog
        </v-tab>
        <v-tab @click="linkToAdmin">
                Admin
        </v-tab>

    </v-tabs>
</template>

<script >
export default {
    methods: {
        linkToAdmin() {
            this.$router.push("/admin");
        },
        linkToPosts() {
            this.$router.push("/posts");
        }
    }
}
</script>