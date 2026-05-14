import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./userAccounts";

export const useActivities = (id? : string) => {
  const {currentUser} = useAccount();
    const queryClient = useQueryClient();
    const location  =useLocation();
  const {data : activities ,isLoading} = useQuery({
  queryKey : ['activities'],
  queryFn : () => agent.get<Activity[]>('/activities').then(res => res.data),
  enabled : !id && location.pathname === '/activities'  && !!currentUser
}) ;
const {data : activity, isLoading : isLoadingActivity } = useQuery({
  queryKey : ['activities', id],
  queryFn : () => agent.get<Activity>(`/activities/${id}`).then(res => res.data),
  enabled : !!id && !!currentUser 
}) ;
const updateActivity = useMutation({
  mutationFn : async (activity : Activity) => agent.put('/activities', activity).then(res => res.data),
  onSuccess : async (_data, activity) => {
    queryClient.setQueryData(['activities', activity.id], activity);
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;   
const createActivity = useMutation({
  mutationFn : async (activity : Activity)=>{
  const response = await agent.post('/activities', activity);
  return response.data as string;
  } ,
  onSuccess : async (id, activity) => {
    queryClient.setQueryData(['activities', id], { ...activity, id });
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;
const deleteActivity = useMutation({
  mutationFn : async (id : string) => agent.delete(`/activities/${id}`).then(res => res.data),
  onSuccess : async () => {
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;
    return {activities,isLoading,updateActivity,createActivity,deleteActivity,activity,isLoadingActivity} ;   
}
