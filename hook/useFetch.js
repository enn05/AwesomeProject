import { useState, useEffect } from "react";
import axios from "axios";
import dummydata from "../utils/dummydata";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': 'd1ee6942b5msh8c11fe79d8a4da7p1381b1jsn027fbb893c46',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };


  const fetchData = async () => {
    setIsLoading(true)

    try {
      // const response = await axios.request(options)
      if(endpoint === 'job-details'){
        setData(dummydata.filter(job => job.job_id === query.job_id))
      } else {
        setData(dummydata)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setError(error)
      alert('There is an error')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return {data, isLoading, error, refetch}

}

export default useFetch;