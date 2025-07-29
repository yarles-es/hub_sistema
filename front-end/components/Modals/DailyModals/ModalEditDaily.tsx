import Modal from "../Modal";

import FormEditDaily from "@/components/Forms/FormEditDaily/FormEditDaily";
import { Daily } from "@/types/Daily";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetDaily: () => void;
  daily: Daily | undefined;
};

const ModalEditDaily: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetDaily,
  daily,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditDaily onClose={onCloseAndGetDaily} daily={daily} />
    </Modal>
  );
};

export default ModalEditDaily;
