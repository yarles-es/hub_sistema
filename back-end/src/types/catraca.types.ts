export type Webhook = {
  ip: string;
  id: number;
  command: number;
  type: number;
};

export type command774 = {
  identification: {
    device: number;
    data: number;
    id: number;
    rfidCard: null | any;
    embededTemplate: null | any;
  };
};

export type WebhookCommand774 = Webhook & {
  response: command774;
};

export type WebhookCommand771 = Webhook & {
  response: command774;
};

export type BuscarIdDiposnivelResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: number;
    };
  };
};

export type IniciarCadastroBiometriaResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: string;
    };
  };
};

export type PassosCadastroBiometriaResponse = Webhook & {
  response: {
    enroll: string;
  };
};

export type ErrorCadastroBiometriaResponse = Webhook & {
  response: {
    enrollStatus: {
      isSuccess: boolean;
      description: string;
    };
  };
};

export type CancelarOperacaoResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: boolean;
    };
  };
};

export type VerificarTemplateIdResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: string;
    };
  };
};

export type MensagensCatracaResponse = {
  message1: string;
  message2: string;
};

export type BuscarMensagemCatracaResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: string;
    };
  };
};

export type BuscarDuracaoInteracaoCatracaResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: number;
    };
  };
};

export type BuscarTipoControleFluxoCatracaResponse = Webhook & {
  response: {
    success: boolean;
    message: string | null;
    data: {
      content: number | null;
    };
  };
};
