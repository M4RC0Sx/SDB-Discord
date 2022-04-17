# Use NodeJS LTS version
FROM node:16.14.2-alpine3.15

# Create sources dir
RUN mkdir -p /usr/src/SDB-Discord
WORKDIR /usr/src/SDB-Discord

# Install Node dependencies
COPY package.json /usr/src/SDB-Discord
RUN npm install

# Copy sources
COPY tsconfig.json /usr/src/SDB-Discord
COPY deploy-commands.js /usr/src/SDB-Discord
COPY src/ /usr/src/SDB-Discord/src

# Start Discord bot
CMD ["npm", "run", "start"]