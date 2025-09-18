import Modal from "../Modal";

import FormDeleteProductSales from "@/components/Forms/Finance/ProductSales/FormDeleteProductSales/FormDeleteProductSales";
import { ProductSales } from "@/types/ProductSales";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productSales?: ProductSales;
};

const ModalDeleteProductSales: React.FC<Props> = ({
  isOpen,
  onClose,
  productSales,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormDeleteProductSales onClose={onClose} productSales={productSales} />
    </Modal>
  );
};

export default ModalDeleteProductSales;
