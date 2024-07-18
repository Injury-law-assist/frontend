import axios from 'axios';
import { useAuthStore } from "../store";

const BASE_URL = 'https://api.g-start-up.com/service/api';
const accessToken = useAuthStore.getState().accessToken;

export const getLogin = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data.data;
}

export const getSignUp = async (email: string, password: string, nickname: string) => {
  const response = await axios.post(`${BASE_URL}/auth/join`, { email, password, nickname });
  const { accessToken, refreshToken } = response.data;
  const setTokens = useAuthStore.getState().setTokens;
  setTokens(accessToken, refreshToken);
  return response.data;
}

export const getChatting = async (accessToken: string) => {
  const response = await axios.get(`${BASE_URL}/chat`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data.data;
}

export const createChatRoom = async (title: string, accessToken: string) => {
  const response = await axios.post(`${BASE_URL}/chat`, { title }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data;
}

export const getMessages = async (r_id: number, accessToken: string) => {
  if (!accessToken) {
    console.error('No access token found');
    throw new Error('No access token found');
  }
  const response = await axios.get(`${BASE_URL}/chat/${r_id}/messages`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data.data;
}

export const deleteChat = async (r_id: number, accessToken: string) => {
  if (!accessToken) {
    console.error('No access token found');
    throw new Error('No access token found');
  }
  await axios.delete(`${BASE_URL}/chat/${r_id}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  console.log(`Chat room with id ${r_id} deleted successfully`);
}

export const postSurvey = async(r_id:number,accessToken:string,resolved:boolean,grade:number,feedback:string)=>{
  if (!accessToken) {
    console.error('No access token found');
    throw new Error('No access token found');
  }
  await axios.post(`${BASE_URL}/chat/${r_id}/status`,{ resolved,grade,feedback }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  console.log(`Chat room with id ${r_id} Survey successfully submit`)
}