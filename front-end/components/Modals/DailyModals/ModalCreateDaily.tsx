import Modal from "../Modal";

import FormNewDaily from "@/components/Forms/FormNewDaily/FormNewDaily";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetDaily: () => void;
};

const ModalCreateDaily: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetDaily,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormNewDaily onClose={onCloseAndGetDaily} />
    </Modal>
  );
};

export default ModalCreateDaily;
