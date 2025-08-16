import Modal from "../Modal";

import FormSearchLog from "@/components/Forms/FormSearchLog/FormSearchLog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSearchLog: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchLog onClose={onClose} />
    </Modal>
  );
};

export default ModalSearchLog;
