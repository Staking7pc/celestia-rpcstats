import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './RpcStatus.css'

function RpcStatus(props) {

  const headers = [
    { key: "moniker", label: "MONIKER" },
    { key: "catchingUp", label: "CATCHING_UP" },
    { key: "earliestBlock", label: "EARLIEST_BLOCK" },
    { key: "latestBlock", label: "LATEST_BLOCK" },
    { key: "network", label: "NETWORK" },
    { key: "version", label: "VERSION" },
    { key: "rpcUrl", label: "END POINT" },
    { key: "timestamp", label: "CHECKED_ON" }
  ];
  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...rpcDetails].sort((a, b) =>
        (col === 'earliestBlock' | 'latestBlock' ) ? Number(a[col]) - Number(b[col]) : (a[col] > b[col]) ? 1 : -1
      )
      setRpcDetails(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...rpcDetails].sort((a, b) =>
        (col === 'catchingUp' | 'moniker' | 'network' | 'rpcUrl' | 'timestamp'| 'version') ? Number(b[col]) - Number(a[col]) : (b[col] > a[col]) ? 1 : -1
      )
      setRpcDetails(sorted)
      setOrder('ASC')
    }

  }

  function setEventDetails() {
    axios.get("https://celestia-tools.brightlystake.com/api/celestia/rpcstatus")
      .then((res) => {
        setRpcDetails(res.data)
        console.log(res.data)
      });
  }

  useEffect(() => {
    setEventDetails();
  }, [])


  return (
    <table id='validators'>
      <thead>
        <tr className='header'>
          {headers.map((row) => {
            return <td onClick={() => sorting(row.key)} key={row.key}>{row.label}</td>
          })}
        </tr>
      </thead>
      <tbody>
        {
          rpcDetails.map((val) => {
            return (
              <tr className={(val.moniker === "Brightlystake_rpc") ? "decorate" : (val.catchingUp != "False")? "error":"NO"} key={val.moniker}>
                 <td className='bold'>{String(val.moniker).toUpperCase()}</td>
                <td className={val.catchingUp === "False" ? "Active" : "InActive"}>{val.catchingUp}</td>
                <td>{val.earliestBlock}</td>
                <td>{val.latestBlock}</td>
                <td className={val.network === "blockspacerace-0" ? "Active" : "InActive"}>{val.network}</td>
                <td className={val.version >= "0.13.0" ? "Active" : "InActive"}>{val.version}</td>
                <td>{val.rpcUrl}</td>
                <td>{val.timestamp}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default RpcStatus

