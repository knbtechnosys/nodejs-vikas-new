FROM node:16

RUN npm install -g nodemon
RUN npm install -g ts-node

WORKDIR /app

# COPY api/club-service/src/package*.json ./
# COPY . .
COPY package*.json .
COPY tsconfig.json .

RUN npm install -f

EXPOSE 3001

# CMD [ "node", "api/club-service/src/server.ts" ]
# CMD [ "cd", "api/club-service/src/" ]
CMD [ "npm", "start" ]


# docker run --name chat -p 3001:3001 --rm -v F:\vikas\chat\src/:/app/src/ chat