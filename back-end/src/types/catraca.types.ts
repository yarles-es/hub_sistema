export type command774 = {
  identification: {
    device: number;
    data: number;
    id: number;
    rfidCard: null | any;
    embededTemplate: null | any;
  };
};

export type WebHook = {
  ip: string;
  id: number;
  command: number;
  type: number;
};

export type WebhookCommand774 = WebHook & {
  response: command774;
};
