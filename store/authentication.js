import Cookie from "js-cookie"

export const namespaced = true

export const state = () => ({
    token: null
})

export const getters = {
    token: state => {
        return state.token
    },
    isAuthenticated(state){
      return state.token != null
    }
}

export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    CLEAR_TOKEN(state) {
        state.token = null;
    }
}

export const actions = {
    authenticateUser({commit,dispatch}, authData) {
      dispatch('dataAction/setLoading', true,  { root: true })
      dispatch('dataAction/clearError',  null,{ root: true })
        let authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            
            dispatch('dataAction/setLoading', false,  { root: true })
            commit("SET_TOKEN", result.idToken)
            
            localStorage.setItem("token", result.idToken)
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
          .catch(error => {
            dispatch('dataAction/setLoading', false,  { root: true })
            dispatch('dataAction/setError', error.response.data.error,  { root: true })
          }
        )
    },
    initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        console.log('init auth')
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
        vuexContext.commit("SET_TOKEN", token);
      },
      logout(vuexContext) {
        console.log("logout!!!")
        vuexContext.commit("CLEAR_TOKEN");
        vuexContext.dispatch("dataAction/resetHolders", null,  { root: true })
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
}
