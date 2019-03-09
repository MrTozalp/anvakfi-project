export default function(context) {
  console.log("[Middleware] Just Auth");
  if (!context.store.getters['authentication/isAuthenticated']) {
    console.log("[Middleware] Just Auth not confirmed");
    context.redirect("/")
  }
  
}
