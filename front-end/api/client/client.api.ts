import { genericRequest } from "../@genericRequest";

import {
  Client,
  ClientResponseGetAll,
  CountClients,
  CreateClient,
  GetAllClient,
  UpdateClient,
} from "@/types/Client";
import { createFullUrlFromParamsBackEnd } from "@/utils/generateURLpaginateOrFilter";

export const getAllClients = async (data: GetAllClient) => {
  const queryString = createFullUrlFromParamsBackEnd(data);
  return await genericRequest<ClientResponseGetAll>(
    "get",
    `cliente/get-all?${queryString}`
  );
};

export const createClient = async (data: CreateClient) => {
  return await genericRequest<ClientResponseGetAll>("post", "cliente/create", {
    body: data,
  });
};

export const updateClient = async (data: UpdateClient) => {
  const { id, ...rest } = data;
  return await genericRequest<Client>("put", `cliente/update/${id}`, {
    body: rest,
  });
};

export const disableClient = async (id: number) => {
  return await genericRequest<Client>("put", `cliente/disable/${id}`);
};

export const activeClient = async (id: number) => {
  return await genericRequest<Client>("put", `cliente/active/${id}`);
};

export const getClientByName = async (name: string) => {
  return await genericRequest<Client[]>("get", `cliente/get-by-name/${name}`);
};

export const getAllByBirthdayPeopleMonth = async () => {
  return await genericRequest<Client[]>(
    "get",
    `cliente/get-all-by-birthday-people-month`
  );
};

export const getCountClients = async () => {
  return await genericRequest<CountClients>(
    "get",
    "cliente/get-count-clientes"
  );
};
