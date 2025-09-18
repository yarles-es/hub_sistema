import Modal from "../Modal";

import FormSearchProductSales from "@/components/Forms/Finance/ProductSales/FormSearchProductSales/FormSearchProductSales";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSearchProductSales: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchProductSales onClose={onClose} />
    </Modal>
  );
};

export default ModalSearchProductSales;
