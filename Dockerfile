# Use the official Node.js LTS 22 image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install Yarn globally
RUN npm install -g yarn

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
