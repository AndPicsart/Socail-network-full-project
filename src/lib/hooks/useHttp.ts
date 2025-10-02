import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Axios } from "../api";
import axios from "axios";

export function useHttp<T =unknown>(url:string,options:AxiosRequestConfig){
	const [loading,setLoading] = useState<boolean>()
	const[error, setError] = useState("")
	const[data, setData] = useState<T | null>(null)
	const refetch = async () => {
		try{
			setLoading(true)
			setError("")
			const response: AxiosResponse<T> = await Axios(url, options)
			setData(response.data)
		}
		catch (err){
			if(axios.isAxiosError(err)){
				setError(err.response?.data.message || "request faild")
			}
		}
		finally{
			setLoading(false)
		}
	}
	useEffect(() => {
		refetch()
	},[])
	return {loading,error,data,refetch}
}