export default function(context) {
    console.log("[Middleware] Just Login");
    if (context.store.getters['authentication/isAuthenticated']) {
        console.log("[Middleware] Just Login Confirmed");
        context.redirect("/app")
    }
  }