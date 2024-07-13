"use client";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

interface Metadata {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": String;
  "4. Interval": String;
  "5. Output Size": String;
  "6. Time Zone": String;
}
interface Timeseries {
  [key: string]: {
    "1. open": String;
    "2. high": String;
    "3. low": String;
    "4. close": string;
    "5. volume": string;
  };
}

export default function Home() {
  const [metaData, setMetaData] = useState<Metadata | null>(null);
  const [timeSeries, setTimeSeries] = useState<Timeseries | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=PROCESS.env.API_KEY"
        );
        console.log(res.data);
        setMetaData(res.data["Meta Data"]);
        setTimeSeries(res.data["Time Series (5min)"]);
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
    console.log(timeSeries);
  }, [metaData, timeSeries]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main className="xl:px-20 px-5  pt-10">
      <div className="bg-green-300  h-fit w-fit p-4 rounded-md">
        <div>
          <h1 className="text-3xl font-bold pb-10">
            Meta Data for Clepher {metaData?.["2. Symbol"]}
          </h1>
        </div>
        <div className="flex gap-1">
          <p className="text-lg font-semibold">Information: </p>
          <span> {metaData?.["1. Information"]}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <p className="text-lg font-semibold">Symbol: </p>
          <span> {metaData?.["2. Symbol"]}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <p className="text-lg font-semibold">Last Refreshed: </p>
          <span> {metaData?.["3. Last Refreshed"]}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <p className="text-lg font-semibold">Interval: </p>
          <span> {metaData?.["4. Interval"]}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <p className="text-lg font-semibold">Output Size: </p>
          <span> {metaData?.["5. Output Size"]}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <p className="text-lg font-semibold">Time Zone: </p>
          <span> {metaData?.["6. Time Zone"]}</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-10">Time Series (5min)</h2>
        {timeSeries ? (
          Object.entries(timeSeries).map(([time, value]) => (
            <div
              key={time}
              className="mt-4 p-4 bg-green-300 border rounded w-fit min-w-[370px]"
            >
              <p className="font-bold">Timestamp: {time}</p>
              <p>Open: {value["1. open"]}</p>
              <p>High: {value["2. high"]}</p>
              <p>Low: {value["3. low"]}</p>
              <p>Close: {value["4. close"]}</p>
              <p>Volume: {value["5. volume"]}</p>
            </div>
          ))
        ) : (
          <p>No time series data available</p>
        )}
      </div>
    </main>
  );
}
