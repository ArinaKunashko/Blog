<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="headline">Autorization</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="onSubmit">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary">{{ isLogin ? 'Login' : 'Sign Up' }}</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="secondary" @click="isLogin = !isLogin" type="submit">Switch to {{ isLogin ? 'Signup' : 'Login'
                        }}></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>


export default {
    data() {
        return {
            isLogin: true,
            email: "",
            password: ""
        };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("authenticateUser", {
                isLogin: this.isLogin,
                email: this.email,
                password: this.password
            })
                .then(() => {
                    this.$router.push('/admin');
                });
        }
    },
};
</script>
  