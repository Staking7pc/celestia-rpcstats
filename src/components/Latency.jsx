import React, { useState, useEffect } from 'react';
import './Latency.css'
import axios from 'axios';
import Header1 from "./Header";

const LatencyTable = () => {
  const [latencyData, setLatencyData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    const fetchLatencyData = async () => {
      const response = await axios.get('https://celestia-tools.brightlystake.com/api/celestia/rpclatency');
      setLatencyData(response.data);
    };
    fetchLatencyData();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = sortField ? [...latencyData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  }) : latencyData;

  function convertTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    console.log(formattedDate);
    return formattedDate;

  }

  return (
    <div>
      <Header1 />
      <h3 className='header1' >Latency from 3 differnet locations for the same endpoint</h3>
      <table id='validators1'>
        <thead>
          <tr className='header'>
            <th onClick={() => handleSort('rpcUrl')}>
              RPC URL {sortField === 'rpcUrl' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('chicago_latency')}>
              Chicago Latency {sortField === 'chicago_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('singapore_latency')}>
              Singapore Latency {sortField === 'singapore_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('germany_latency')}>
              Germany Latency {sortField === 'germany_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('time')}>
              As Of Time {sortField === 'time' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            sortedData.map((row) => (
              <tr className = {(row.chicago_latency < 1 && row.singapore_latency < 1 && row.germany_latency < 1)?'decorate':"NO"}key={row.rpcUrl}>
                <td>{row.rpcUrl}</td>
                <td>{row.chicago_latency.toFixed(2)}</td>
                <td>{row.singapore_latency.toFixed(2)}</td>
                <td>{row.germany_latency.toFixed(2)}</td>
                <td>{convertTime(row.time)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatencyTable;
