import Modal from "../Modal";

import FormUpdatePassword from "@/components/Forms/FormUpdatePassword/FormUpdatePassword";
import { useModalsStore } from "@/store/modalsController";

const ModalUpdatePassword: React.FC = () => {
  const { isOpen, setIsOpen } = useModalsStore((state) => ({
    isOpen: state.modalUpdatePassword,
    setIsOpen: state.setModalUpdatePassword,
  }));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <FormUpdatePassword onclose={handleClose} />
    </Modal>
  );
};

export default ModalUpdatePassword;
