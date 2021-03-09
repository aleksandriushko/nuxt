export default function({ store, route, redirect }) {
    const user = store.state.users.user
    const blockedRoute = /\/admin\/*/g
    // const homeRoute = "/";

    if (!user && route.path.match(blockedRoute)) {
        redirect("/");
    }

    console.log(user)
    console.log(route.path)
    // if (user && route.path === homeRoute) {
    //     redirect("/admin");
    // }
}