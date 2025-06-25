import axiosInstance from "@/api/config";

export const fetchAll = async (query: Record<string, unknown>) => {
  return await axiosInstance.get(`/pokemon/?limit=${query.limit}&offset=${query.offset}`); 
}

export const fetchPokemonByName = async (query: Record<string, unknown>) => {
  return await axiosInstance.get(`/pokemon/${query.name}`); 
}