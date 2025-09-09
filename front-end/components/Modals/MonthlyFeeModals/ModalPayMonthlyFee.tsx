import Modal from "../Modal";

import FormPayMonthlyFee from "@/components/Forms/Finance/MonthlyFee/FormPayMonthlyFee/FormPayMonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetMonthlyFee: () => void;
  monthlyFeeId: number;
};

const ModalPayMonthlyFee: React.FC<Props> = ({
  isOpen,
  onClose,
  monthlyFeeId,
  onCloseAndGetMonthlyFee,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormPayMonthlyFee
        onClose={onCloseAndGetMonthlyFee}
        monthlyFeeId={monthlyFeeId}
      />
    </Modal>
  );
};

export default ModalPayMonthlyFee;
