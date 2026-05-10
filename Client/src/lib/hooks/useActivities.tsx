import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();
  const {data : activities ,isPending} = useQuery({
  queryKey : ['activities'],
  queryFn : () => agent.get<Activity[]>('/activities').then(res => res.data),
}) ;
const updateActivity = useMutation({
  mutationFn : async (activity : Activity) => agent.put('/activities', activity).then(res => res.data),
  onSuccess : async () => {
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;   
const createActivity = useMutation({
  mutationFn : async (activity : Activity) => agent.post('/activities', activity).then(res => res.data),
  onSuccess : async () => {
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;
const deleteActivity = useMutation({
  mutationFn : async (id : string) => agent.delete(`/activities/${id}`).then(res => res.data),
  onSuccess : async () => {
    await queryClient.invalidateQueries({queryKey : ['activities']});
  }
}) ;
    return {activities,isPending,updateActivity,createActivity,deleteActivity};   
}
