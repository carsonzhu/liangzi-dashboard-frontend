const openLoginModal = () => {
  return { type: "OPEN_LOGIN_MODAL" };
};

const closeLoginModal = () => {
  return { type: "CLOSE_LOGIN_MODAL" };
};

export { openLoginModal, closeLoginModal };
