import Modal from "../Modal";

import FormSearchClient from "@/components/Forms/FormSearchClient/FormSearchClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSearchClient: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchClient onClose={onClose} />
    </Modal>
  );
};

export default ModalSearchClient;
