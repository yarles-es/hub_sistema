import Modal from "../Modal";

import FormCancelMonthlyFee from "@/components/Forms/FormCancelMonthlyFee/FormCancelMonthlyFee";
import FormPayMonthlyFee from "@/components/Forms/FormPayMonthlyFee/FormPayMonthlyFee";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetMonthlyFee: () => void;
  monthlyFee: MonthlyFeeWithClient | undefined;
};

const ModalPayMonthlyFee: React.FC<Props> = ({
  isOpen,
  onClose,
  monthlyFee,
  onCloseAndGetMonthlyFee,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormPayMonthlyFee
        onClose={onCloseAndGetMonthlyFee}
        monthlyFee={monthlyFee}
      />
    </Modal>
  );
};

export default ModalPayMonthlyFee;
