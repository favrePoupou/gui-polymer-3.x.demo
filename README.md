## GSKED Development environment

## Prerequisites

- Node.js (>=7.5.0), used to run JavaScript tools from the command line.
- npm (>=4.2), the node package manager, installed with Node.js and used to install Node.js packages.

npm --version (to define the version of npm)
node --version (to define the version of node)

### Initialize project from template (only use if starting from nothing)

    mkdir gui-polymer-3.x
    cd gui-polymer-3.x
    polymer init

### Each project is starting from a minimal template 

### Clone the repository (existing project based on minimal starter kit from polymer init)

	npm install -g polymer-cli
	polymer --version 
	git clone  https://github.com/favrePoupou/gui-polymer-3.x.git


### Start the development server

    npm install
    polymer serve or npm run start

### In case that polymer is not define as internal or external command, define the path 

### Access localhost from VM or other device 
https://stackoverflow.com/questions/9682262/how-do-i-connect-to-this-localhost-from-another-computer-on-the-same-network