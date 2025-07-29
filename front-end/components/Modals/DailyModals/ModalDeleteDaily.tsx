import Modal from "../Modal";

import { FormDeleteDaily } from "@/components/Forms/FormDeleteDaily/FormDeleteDaily";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetDaily: () => void;
  itemSelected: number;
};

const ModalDeleteDaily: React.FC<Props> = ({
  isOpen,
  onClose,
  itemSelected,
  onCloseAndGetDaily,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormDeleteDaily
        onClose={onCloseAndGetDaily}
        itemSelected={itemSelected}
      />
    </Modal>
  );
};

export default ModalDeleteDaily;
