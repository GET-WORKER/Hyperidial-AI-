import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/slds`;

const getAll = async (skip, take) => {
  try {
    const params = {};
    if (skip !== 0) params.skip = skip;
    if (take !== 0) params.take = take;
    const response = await axios.get(API_URL, {
      params,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const create = async (center) => {
  try {
    const response = await axios.post(API_URL, center);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const update = async (center) => {
  try {
    const response = await axios.put(`${API_URL}/${center.id}`, center);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default { getAll, create, update, remove };
