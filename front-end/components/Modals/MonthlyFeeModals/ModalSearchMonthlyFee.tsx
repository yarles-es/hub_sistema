import Modal from "../Modal";

import FormSearchClient from "@/components/Forms/FormSearchClient/FormSearchClient";
import FormSearchMonthlyFee from "@/components/Forms/FormSearchMonthlyFee/FormSearchMonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSearchMonthlyFee: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchMonthlyFee onClose={onClose} />
    </Modal>
  );
};

export default ModalSearchMonthlyFee;
