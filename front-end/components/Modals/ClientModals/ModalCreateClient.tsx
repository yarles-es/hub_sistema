import Modal from "../Modal";

import FormNewClient from "@/components/Forms/FormNewClient/FormNewClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetClient: () => void;
};

const ModalCreateClient: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormNewClient onClose={onCloseAndGetClient} />
    </Modal>
  );
};

export default ModalCreateClient;
