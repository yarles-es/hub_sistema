type Params = {
  params: Record<string, string | number | (string | number)[] | undefined>;
  pathName: string;
  searchParams: URLSearchParams;
};

// função para criar a url completa com os parametros de busca no browser
export const createFullUrlFromParamsBrowser = (data: Params): string => {
  const params = new URLSearchParams();

  Object.entries(data.params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== "" && item != null) {
          params.append(key, item.toString());
        }
      });
    } else if (value !== "" && value != null) {
      params.append(key, value.toString());
    }
  });

  return `${data.pathName}?${params.toString()}`;
};

// função para criar a url completa com os parametros de busca no backend
export const createFullUrlFromParamsBackEnd = (
  data: Record<string, string | number | (string | number)[] | undefined>
): string => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v.toString()));
    } else if (value !== "" && value != null) {
      params.set(key, value.toString());
    }
  });

  return params.toString();
};
