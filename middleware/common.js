export default function ({ store, redirect, route }) {
    if(!isCommonRoute(route))
        store.state.selectedCommon = null 
  }
  
  function isCommonRoute(route) {
    if (route.matched.some(record => record.path == '/app/commons')) {
      return true
    }
  }
  