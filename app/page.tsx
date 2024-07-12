"use client";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

interface Metadata {
  "1. Information": string;
  "2. symbol": String;
  "3. last refreshed": String;
  "4. interval": String;
  "5 output size": String;
  "6 time zone": String;
}
interface Timeseries {
  [key: string]: {
    open: String;
    high: String;
    low: String;
    close: string;
    volume: string;
  };
}

export default function Home() {
  const [metaData, setMetaData] = useState<Metadata | null>(null);
  const [timeSeries, setTimeseries] = useState<Timeseries | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://dummyjson.com/c/163c-452c-40f9-9679"
        );
        console.log(res.data);
        setMetaData(res.data["Meta Data"]);
        setTimeseries(res.data["Time Series (5Min)"]);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    console.log(metaData);
  }, [metaData]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main className="p-10">
      <div>
        <h1>Meta Data for Clepher {metaData?.["2. symbol"]}</h1>
      </div>
      <div className="flex">
        <p>Information:</p>
        <span>{metaData?.["1. Information"]}</span>
      </div>
    </main>
  );
}
