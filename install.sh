# /bin/bash

# install client modules
echo "Installing client dependencies"
cd client && npm install
cd ..

# install server modules
echo "Installing server dependencies"
cd server && npm install
cd ..

