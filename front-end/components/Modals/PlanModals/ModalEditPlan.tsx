import Modal from "../Modal";

import FormEditPlan from "@/components/Forms/FormEditPlan/FormEditPlan";
import { Plano } from "@/types/Plano";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetPlan: () => void;
  plan: Plano | undefined;
};

const ModalEditPlan: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetPlan,
  plan,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditPlan onClose={onCloseAndGetPlan} plan={plan} />
    </Modal>
  );
};

export default ModalEditPlan;
