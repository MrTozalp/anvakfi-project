export const namespaced = true

export const state = () => ({
    branches: [],
})

export const mutations = {
    SET_BRANCHES(state, branches) {
        state.branches = branches
    },
    ADD_BRANCH(state, branch) {
        state.branches.push(branch)
    },
    EDIT_BRANCH(state, editedBranch) {
        const branchIndex = state.branches.findIndex(
          branch => branch.id === editedBranch.id
        );
        state.branches[branchIndex] = editedBranch
    },
    DELETE_BRANCH(state, deletedBranch){
        const index = state.branches.findIndex(
            branch => branch.id === deletedBranch.id
        );
        state.branches.splice(index,1);
    },
}

export const actions = {
    loadBranches({commit,dispatch}){
        dispatch('dataAction/init', 'branch', { root: true })
        return this.$axios
            .$get("/branches.json")
            .then(data => {
                const branchesArray = [];
                for(const key in data){
                    branchesArray.push({ ...data[key], id: key });
                }
                commit("SET_BRANCHES", branchesArray)
                dispatch('dataAction/setLoaded', 'branch', { root: true })
            })
            .catch(e => {
                context.error(e)
            });
    },
    deleteBranch(vuexContext, deletedBranch) {
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/branches/" +
        deletedBranch.id +
        ".json?auth="+  vuexContext.rootGetters['authentication/token'], deletedBranch)
        .then(res => {
            vuexContext.commit('DELETE_BRANCH', deletedBranch)
        })
        .catch(e => console.log(e))
    },
    addBranch(vuexContext, branch) {
        const createdBranch = {
            ...branch,
            updatedDate: new Date()
        }
        return this.$axios
        .$post(
            "https://anadolu-vakfi.firebaseio.com/branches.json?auth=" +vuexContext.rootGetters['authentication/token'], createdBranch)
        .then(data => {
            vuexContext.commit('ADD_BRANCH', {...createdBranch, id: data.name})
        })
        .catch(e => console.log(e));
    },
    editBranch(vuexContext, editedBranch) {
        console.log("edited member id : " +editedBranch.id)
        return this.$axios
        .$put("https://anadolu-vakfi.firebaseio.com/branches/" +
        editedBranch.id +
        ".json?auth=" + vuexContext.rootGetters['authentication/token'], editedBranch)
        .then(res => {
            vuexContext.commit('EDIT_BRANCH', editedBranch)
        })
        .catch(e => console.log(e))
    }

}