import Modal from "../Modal";

import FormNewPlan from "@/components/Forms/Plans/FormNewPlan/FormNewPlan";
import FormCreateProduct from "@/components/Forms/Products/FormCreateProduct/FormCreateProduct";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalCreateProduct: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormCreateProduct onClose={onClose} />
    </Modal>
  );
};

export default ModalCreateProduct;
