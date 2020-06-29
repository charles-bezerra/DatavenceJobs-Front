export function isAuthenticated() {
    const user = localStorage.getItem("user");
    return (user) ? true : false;  
}

export function getUser() {
    const user = localStorage.getItem("user");
    return (user) ? JSON.parse(user) : null;
}