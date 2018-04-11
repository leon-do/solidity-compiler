const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
var solc = require('solc')

express()

.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())

.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

.post('/', (req, res) => {
	const input = req.body.input
	var output = solc.compile(input, 1)
	for (var contractName in output.contracts) {
	    // code and ABI that are needed by web3
	    res.send({
	    	bytecode: output.contracts[contractName].bytecode,
	    	abi: JSON.parse(output.contracts[contractName].interface)
	    })
	}

})

.listen(PORT)