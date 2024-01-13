import { useQuery } from "@tanstack/react-query"
import { createMutation } from "react-query-kit";

export type QueryHook = { data: any; status: "error" | "idle" | "pending" | "success"; isFetching: boolean; };

export const useGetMedicalRecord = createMutation({
  mutationFn: async (variable: {
    nik: string
  }) => {
    const { nik } = variable
    const api = `http://localhost:8080/api/users/show-nik/${nik}`
    const response = await fetch(api);
    const data = await response.json();
    return { data: data?.result, status: true }
  },
})