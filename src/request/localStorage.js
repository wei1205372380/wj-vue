// token过期时间
const expire = 1000*60*30;

let storage = {
    setToken(token) {
        let curTime = new Date().getTime();
        localStorage.setItem("tokenMsg", JSON.stringify({"token": token, "time": curTime}));
    },
    getToken() {
        let tokenMsg = JSON.parse(localStorage.getItem("tokenMsg"));
        if (!tokenMsg) {
            return null;
        }
        if ((tokenMsg.time + expire) < new Date().getTime()) {
            this.removeToken();
            return null;
        } else {
            return tokenMsg.token;
        }
    },
    removeToken() {
        localStorage.removeItem("tokenMsg");
    }
}

export default storage;
