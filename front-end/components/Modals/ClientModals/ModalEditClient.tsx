import Modal from "../Modal";

import FormEditClient from "@/components/Forms/FormEditClient/FormEditClient";
import { Client } from "@/types/Client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetClient: () => void;
  client: Client | undefined;
};

const ModalEditClient: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
  client,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditClient onClose={onCloseAndGetClient} client={client} />
    </Modal>
  );
};

export default ModalEditClient;
