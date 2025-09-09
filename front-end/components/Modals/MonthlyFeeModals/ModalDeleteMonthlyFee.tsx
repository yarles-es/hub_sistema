import Modal from "../Modal";

import FormDeleteMonthlyFee from "@/components/Forms/Finance/MonthlyFee/FormDeleteMonthlyFee/FormDeleteMonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetMonthlyFee: () => void;
  monthlyFeeId: number;
};

const ModalDeleteMonthlyFee: React.FC<Props> = ({
  isOpen,
  onClose,
  monthlyFeeId,
  onCloseAndGetMonthlyFee,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormDeleteMonthlyFee
        onClose={onCloseAndGetMonthlyFee}
        monthlyFeeId={monthlyFeeId}
      />
    </Modal>
  );
};

export default ModalDeleteMonthlyFee;
