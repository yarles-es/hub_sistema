import Modal from "../Modal";

import FormDeleteProduct from "@/components/Forms/Products/FormDeleteProduct/FormDeleteProduct";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
};

const ModalDeleteProduct: React.FC<Props> = ({
  isOpen,
  onClose,
  productId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormDeleteProduct onClose={onClose} itemSelected={productId} />
    </Modal>
  );
};

export default ModalDeleteProduct;
