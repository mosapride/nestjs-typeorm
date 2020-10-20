FROM mysql:8

ENV MYSQL_ROOT_PASSWORD test
ENV MYSQL_DATABASE nestdb

EXPOSE 3306

COPY ./nestdb.cnf /etc/mysql/conf.d
COPY ./init.sql /docker-entrypoint-initdb.d

RUN chown root:root  /etc/mysql/conf.d/nestdb.cnf
RUN chmod 664 /etc/mysql/conf.d/nestdb.cnf

CMD ["mysqld"]
