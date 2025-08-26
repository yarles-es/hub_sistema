import Modal from "../Modal";

import FormCancelMonthlyFee from "@/components/Forms/FormCancelMonthlyFee/FormCancelMonthlyFee";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetMonthlyFee: () => void;
  monthlyFeeId: number;
};

const ModalCancelMonthlyFee: React.FC<Props> = ({
  isOpen,
  onClose,
  monthlyFeeId,
  onCloseAndGetMonthlyFee,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormCancelMonthlyFee
        onClose={onCloseAndGetMonthlyFee}
        monthlyFeeId={monthlyFeeId}
      />
    </Modal>
  );
};

export default ModalCancelMonthlyFee;
