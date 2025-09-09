import Modal from "../Modal";

import FormSearchDaily from "@/components/Forms/Finance/Daily/FormSearchDaily/FormSearchDaily";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSearchDaily: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchDaily isOpen={isOpen} onClose={onClose} />
    </Modal>
  );
};

export default ModalSearchDaily;
