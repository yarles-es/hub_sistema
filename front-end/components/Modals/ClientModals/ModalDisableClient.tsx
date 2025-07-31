import Modal from "../Modal";

import { Client } from "@/types/Client";

import FormDisableClient from "@/components/Forms/FormDisableClient/FormDisableClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  client: Client | undefined;
  onCloseAndGetClient: () => void;
};

const ModalDisableClient: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
  client,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormDisableClient client={client} onClose={onCloseAndGetClient} />
    </Modal>
  );
};

export default ModalDisableClient;
