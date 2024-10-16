export const handleLogout = (navigate) => {
    localStorage.removeItem('auth_token');
    navigate('/login')
    // window.location.reload();
}

export const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };