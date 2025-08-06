import Modal from "../Modal";

import FormNewPlan from "@/components/Forms/FormNewPlan/FormNewPlan";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetPlans: () => void;
};

const ModalCreatePlan: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetPlans,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormNewPlan onClose={onCloseAndGetPlans} />
    </Modal>
  );
};

export default ModalCreatePlan;
