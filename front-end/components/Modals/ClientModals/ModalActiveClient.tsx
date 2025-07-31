import Modal from "../Modal";

import { Client } from "@/types/Client";

import FormActiveClient from "@/components/Forms/FormActiveClient/FormActiveClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  client: Client | undefined;
  onCloseAndGetClient: () => void;
};

const ModalActiveClient: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
  client,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormActiveClient client={client} onClose={onCloseAndGetClient} />
    </Modal>
  );
};

export default ModalActiveClient;
