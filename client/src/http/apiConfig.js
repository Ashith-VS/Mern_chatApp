export const baseUrl = 'http://localhost:5000'

export const UrlEndPoint = {
    login: "/auth/login",
    register: "/auth/register",
    currentUser: "/auth/currentuser",
    search:search=> `/api/message/findUser?search=${search}`,
    accessChat:`/api/chat/`,
    sendMessage: "/api/message",
    fetchMessage:id=>`/api/message/${id}`,
}