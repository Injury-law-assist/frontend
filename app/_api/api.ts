import { useAuthStore } from "../store";

const BASE_URL = 'https://api.g-start-up.com/api'
const accessToken = useAuthStore.getState().accessToken;

export const getLogin = async(email:string,password:string)=>{
    try{
        const response = await fetch(BASE_URL+'/auth/login',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
            })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        const { accessToken, refreshToken } = data;
        const setTokens = useAuthStore.getState().setTokens;
        setTokens(accessToken, refreshToken);

        return data;
      } catch (error) {
        console.error('Fetch error:', error);
      }
}

export const getSignUp = async(email:string,password:string,nickname:string)=>{
    try{
        const response = await fetch(BASE_URL+'/auth/join',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                nickname:nickname,
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
  
          const { accessToken, refreshToken } = data;
          const setTokens = useAuthStore.getState().setTokens;
          setTokens(accessToken, refreshToken);
  
          return data;
        } catch (error) {
          console.error('Fetch error:', error);
     }
}

export const getChatting = async()=>{
    try {
        const response = await fetch(BASE_URL+'/chat', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
}

export const createChatRoom=async(title:string)=>{
    try {
      const response = await fetch(BASE_URL+'/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title:title,
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log('Chat room created:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
}

export const getMessages = async(r_id:number)=>{
    if (!accessToken) {
        console.error('No access token found');
        return;
      }
      try{
        const response = await fetch(BASE_URL+`/chat/${r_id}/messages`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
      }catch(error){
        console.error('Fetch error',error);
      }
}

export const deleteChat = async (r_id: number) => {
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
      const response = await fetch(BASE_URL + `/chat/${r_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      console.log(`Chat room with id ${r_id} deleted successfully`);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }