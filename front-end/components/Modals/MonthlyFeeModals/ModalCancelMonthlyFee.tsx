import Modal from "../Modal";

import FormCancelMonthlyFee from "@/components/Forms/FormCancelMonthlyFee/FormCancelMonthlyFee";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetMonthlyFee: () => void;
  monthlyFee: MonthlyFeeWithClient | undefined;
};

const ModalCancelMonthlyFee: React.FC<Props> = ({
  isOpen,
  onClose,
  monthlyFee,
  onCloseAndGetMonthlyFee,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormCancelMonthlyFee
        onClose={onCloseAndGetMonthlyFee}
        monthlyFee={monthlyFee}
      />
    </Modal>
  );
};

export default ModalCancelMonthlyFee;
