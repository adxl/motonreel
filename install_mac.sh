# /bin/bash

# install client modules
echo "Installing client dependencies"
cd client && yarn install
cd ..

# install server modules
echo "Installing server dependencies"
cd server && yarn install
cd ..

