export const handleLogout = (navigate) => {
    localStorage.removeItem('auth_token');
    navigate('/login')
    // window.location.reload();
}