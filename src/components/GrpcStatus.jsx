import React, { useState, useEffect } from 'react';
import './Grpcstatus.css'
import axios from 'axios';
import Header1 from "./Header";

const GrpcStatus = () => {
  const [latencyData, setLatencyData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // reset the copied state after 2 seconds
  };

  useEffect(() => {
    const fetchLatencyData = async () => {
      const response = await axios.get('https://celestia-tools.brightlystake.com/api/celestia/grpcstatus');
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
      <h3 className='header1' >If the gRPC url provided in <a target="_blank" rel="noopener noreferrer"  href='https://github.com/celestiaorg/docs/blob/main/docs/nodes/blockspace-race.mdx'>github</a> didnt work we tried removing http/https and tried, If that didnt work we tried by adding default port 9090</h3>
      <h4 className='header1'>Method used: We ran "grpcurl -plaintext endpoints list" to see if we get a response</h4>
      <table id='validators1'>
        <thead>
          <tr className='header'>
            <th onClick={() => handleSort('grpc_url')}>
              gRPC URL {sortField === 'grpc_url' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('status')}>
              Working URL {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('time')}>
              Last Checked {sortField === 'time' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            sortedData.map((row) => (
              <tr className={(row.status=='FAIL') ? 'error' : "NO"} key={row.grpc_url}>
                <td>{row.grpc_url}</td>
                <td class="tooltip" onClick={() => handleCopyClick(row.status)}>{row.status}
                  <span class="tooltiptext">Click to copy</span>
                </td>
                <td>{row.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrpcStatus;
