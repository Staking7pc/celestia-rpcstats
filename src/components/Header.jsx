import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div>
      <ul>
        <li className='li'>
          <a class="" href="https://brightlystake.com">Brightlystake</a>
        </li>
        <li className='li-r'><a class="active" href="/rpc-status">RPC</a></li>
        <li className='li-r'><a class="active" href="/grpc-status">gRPC</a></li>
        {/* <li className='li-r'><a class="active" href="/api-status">API</a></li> */}
      </ul>
    </div>
  )
}
