# Use the official DevContainer image
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Create app directory
WORKDIR /usr/src/app

# Verify existing Yarn installation
RUN yarn --version

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install

# Install Biome globally
RUN yarn global add @biomejs/biome

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]
