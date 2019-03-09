export default function ({ store, route }) {
    if(!isCommonRoute(route))
        store.dispatch('commonInfo/resetSelectedCommon')
  
  function isCommonRoute(route) {
    if (route.matched.some(record => record.path == '/app/commons')) {
      return true
    }
  }
}