import { instance } from "./base";

const endpoint = "resource/";
const limit = 20;

export const apiEndopoints = {
  getAll: function (page: number) {
    return instance.get(endpoint, {
      params: { offset: page * 20, limit: limit },
    });
  },
};
