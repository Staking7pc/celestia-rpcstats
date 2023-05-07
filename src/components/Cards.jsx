    import React from 'react'
    import './Cards.css'
    export default function Cards() {
        return (

            <body>
                <div class="container">
                    <div class="heading">
                        <h4>RPC Stats for Celestia</h4>
                    </div>
                    <div class="row">
                        <div class="card">
                            <div class="card-header">
                                <h3>RPC endpoints</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    We gathered endpoints from the github page for blockspace race particpants
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/celestiaorg/docs/blob/main/docs/nodes/blockspace-race.mdx" class="btn">Click here</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Accuracy</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    We run two RPC calls every minute /abci and /status and publish the results accordingly.
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="" class="btn">Our approach</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Discrepancies</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    If you encounter any descrepancies please feel free to contact us from the link below.
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="https://linktr.ee/brightlystake" class="btn">Socials</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Add more details</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    This is just an experiment if you have thoughts around getting this better, we are open
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="https://linktr.ee/brightlystake" class="btn">Contact us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
