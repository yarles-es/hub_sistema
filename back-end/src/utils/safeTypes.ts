import { FormPagamento, StatusMensalidade } from '@prisma/client';

export const safeParseInt = (value: any): number | undefined => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? undefined : parsed;
};

export const safeParseDate = (value: any): Date | undefined => {
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
};

export const safeParseFormPagamentoArray = (value: any): FormPagamento[] => {
  if (Array.isArray(value)) {
    return value.filter((status): status is FormPagamento =>
      Object.values(FormPagamento).includes(status as FormPagamento),
    );
  } else if (typeof value === 'string') {
    return Object.values(FormPagamento).includes(value as FormPagamento) ? [value as FormPagamento] : [];
  }
  return [];
};

export const safeParseStatusMensalidadeArray = (value: any): StatusMensalidade[] => {
  if (Array.isArray(value)) {
    return value.filter((status): status is StatusMensalidade =>
      Object.values(StatusMensalidade).includes(status as StatusMensalidade),
    );
  } else if (typeof value === 'string') {
    return Object.values(StatusMensalidade).includes(value as StatusMensalidade)
      ? [value as StatusMensalidade]
      : [];
  }
  return [];
};

export const safeParseString = (value: any): string | undefined => {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
};
