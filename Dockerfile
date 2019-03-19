FROM node:10.15.1

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i 

ENV MAIL_USERNAME=sibusisoj@thedigitalacademy.co.za
ENV MAIL_PASSWORD=sadkdasdklsa
ENV DB_HOST=whm.thedigitalacademy.co.za
ENV DB_USER=expo
ENV DB_PASS=nryyZ&R57C9W
ENV DB_NAME=expo_db



EXPOSE 3000

CMD [ "npm", "start" ]