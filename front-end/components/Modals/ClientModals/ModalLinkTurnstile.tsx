import Modal from "../Modal";

import { cancelTurnstileOperation } from "@/api/turnstile/turnstile.api";
import FormLinkTurnstile from "@/components/Forms/FormLinkTurnstile/FormLinkTurnstile";
import { Client } from "@/types/Client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetClient: () => void;
  client: Client | undefined;
};

const ModalLinkTurnstile: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
  client,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={async () => {
        await cancelTurnstileOperation();
        onClose();
      }}
    >
      <FormLinkTurnstile onClose={onCloseAndGetClient} client={client} />
    </Modal>
  );
};

export default ModalLinkTurnstile;
