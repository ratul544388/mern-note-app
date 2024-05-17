import LoginModal from "../components/modals/login-modal";
import NoteModal from "../components/modals/note-modal";
import SignupModal from "../components/modals/signup-modal";

export const ModalProvider = () => {
  return (
    <>
      <NoteModal />
      <SignupModal/>
      <LoginModal/>
    </>
  );
};
