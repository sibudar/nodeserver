FROM node:10.15.1

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i 
RUN npm install bcrypt


 ENV MAIL_USERNAME=sibusisoj@thedigitalacademy.co.za
 ENV MAIL_PASSWORD=sadkdasdklsa
 ENV DB_HOST=localhost
 ENV DB_USER=expo
 ENV DB_PASS=12345
 ENV DB_NAME=expo


EXPOSE 3000

CMD [ "npm", "start" ]