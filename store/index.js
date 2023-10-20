import axios from 'axios';
import Cookie from "js-cookie";

export const state = () => ({
    posts: [],
});

export const getters = {
    getPostById: (state) => (postId) => {
        return state.posts.find((post) => post.id === postId);
    },
    isAuthenticated(state) {
        return state.token != null;
    }
};

export const mutations = {
    addPost(state, post) {
        state.posts.push(post);
    },
    updatePost(state, updatedPost) {
        const index = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
            state.posts[index] = updatedPost;
        }
    },
    deletePost(state, postId) {
        const index = state.posts.findIndex((post) => post.id === postId);
        if (index !== -1) {
            state.posts.splice(index, 1);
        }
    },
    setPosts(state, posts) {
        state.posts = posts;
    },
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = null;
    }
};

export const actions = {
    savePost(vuexContext, post) {
        return axios.post(process.env.baseUrl + '/posts.json?auth=" + vuexContext.state.token', { ...post, updatedDate: new Date() })
            .then((response) => {
                // Вызываем мутацию для добавления поста в хранилище
                vuexContext.commit("addPost", { ...post, id: response.data.name })
            })
            .catch((error) => {
                // Обработка ошибки
                console.error('Ошибка:', error);
            })
    },
    deletePost(vuexContext, postId) {
        return axios.delete(process.env.baseUrl + `/posts/${postId}.json`)
            .then((response) => {
                // Вызываем мутацию для добавления поста в хранилище
                vuexContext.commit("deletePost", postId)
            })
            .catch((error) => {
                // Обработка ошибки
                console.error('Ошибка:', error);
            })
    },
    nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.baseUrl + "/posts.json")
            .then(response => {
                const postArray = []
                for (const key in response.data) {
                    postArray.push({ ...response.data[key], id: key })
                }
                vuexContext.commit("setPosts", postArray)
            })
            .catch(e => console.log(e))
    },
    setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
    },
    updatePost(vuexContext, updatedPost) {
        return axios.put(process.env.baseUrl + "/posts/" + updatedPost.id + ".json?auth=" + vuexContext.state.token, updatedPost)
            .then(response => vuexContext.commit("updatePost", updatedPost)
            )
            .catch(e => console.log(e))
    },
    authenticateUser(vuexContext, authData) {
        let authUrl =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            process.env.fbAPIKey;
        if (!authData.isLogin) {
            authUrl =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
                process.env.fbAPIKey;
        }
        return this.$axios
            .$post(authUrl, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
            .then(result => {
                vuexContext.commit("setToken", result.idToken);
                localStorage.setItem("token", result.idToken);
                localStorage.setItem(
                    "tokenExpiration",
                    new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                );
                Cookie.set("jwt", result.idToken);
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                );
            })
            .catch(e => console.log(e));
    },
    initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
            if (!req.headers.cookie) {
                return;
            }
            const jwtCookie = req.headers.cookie
                .split(";")
                .find(c => c.trim().startsWith("jwt="));
            if (!jwtCookie) {
                return;
            }
            token = jwtCookie.split("=")[1];
            expirationDate = req.headers.cookie
                .split(";")
                .find(c => c.trim().startsWith("expirationDate="))
                .split("=")[1];
        } else {
            token = localStorage.getItem("token");
            expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
            console.log("No token or invalid token");
            vuexContext.dispatch("logout");
            return;
        }
        vuexContext.commit("setToken", token);
    },
    logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
        }
    }
}


