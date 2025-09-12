import Modal from "../Modal";

import FormSellProduct from "@/components/Forms/Products/FormSellProduct/FormSellProduct";
import { Product } from "@/types/product";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
};

const ModalSellProduct: React.FC<Props> = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSellProduct onClose={onClose} product={product} />
    </Modal>
  );
};

export default ModalSellProduct;
