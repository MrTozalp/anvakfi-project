export default function(context) {
  console.log("[Middleware] Check Auth");
  context.store.dispatch("authentication/initAuth", context.req,  { root: true });
}
