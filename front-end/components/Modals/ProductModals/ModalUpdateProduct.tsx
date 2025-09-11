import Modal from "../Modal";

import FormUpdateProduct from "@/components/Forms/Products/FormUpdateProduct/FormUpdateProduct";
import { Product } from "@/types/product";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | undefined;
};

const ModalUpdateProduct: React.FC<Props> = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormUpdateProduct onClose={onClose} product={product} />
    </Modal>
  );
};

export default ModalUpdateProduct;
