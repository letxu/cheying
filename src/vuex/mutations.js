export const userStatus = (state, user) => {
    if (user) {
        state.currentUser = user
        state.isLogin = true
    } else if (user == null) {
        sessionStorage.setItem('userName', null);
        sessionStorage.setItem('userToken', "");
        state.currentUser = null;
        state.isLogin = false;
        state.token = ""
    }
}
export const userToken = (state, userToken) => {
    if (userToken) {
        state.token = userToken;
    } else {
        state.token = null;
    }
}
export const setAvatar = (state, avatar) => {
    if (userToken) {
        state.avatar = avatar;
    } else {
        state.avatar = headerImg;
    }
}
export const setNickname = (state, nickname) => {
    if (userToken) {
        state.nickname = nickname;
    } else {
        state.nickname = "";
    }
}
export const setNumber = (state, account_number) => {
    if (userToken) {
        state.account_number = account_number;
    } else {
        state.account_number = "";
    }
}
