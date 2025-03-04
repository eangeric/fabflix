- # General

  Note: Video includes a voice over for your convenience!

  - #### Team Name:

    cowboys

  - #### Names:

    Eric Eang

    Darrien Sao

  - #### Project 4 Video Demo Link:

    https://youtu.be/12R_c0I8y6c

- #### Instruction of deployment:

  Created a master-slave relationship between two instances from an image of fabflix. Then created a load balancer to proxy and balance requests to the master or slave instance.

- #### Collaborations and Work Distribution:

  Eric Eang: Task 2, 3, 4

  Darrien Sao: Task 1, Extra Credit

- # Connection Pooling

  - #### Include the filename/path of all code/configuration files in GitHub of using JDBC Connection Pooling.

    - In /WEB-INF/web.xml

      - Register a datasource for write and a datasource for read

    - In /META-INF/context.xml

      - Define Connection Pooling with one datasource for write and one datasource for read

    - In /src using PreparedStatements
      - AddMovieServlet.java
      - AddStarServlet.java
      - MainParse.java
      - PaymentServlet.java
      - EmployeeServlet.java
      - GenresServlet.java
      - LoginServlet.java
      - MetadataServlet.java
      - MoviesServlet.java
      - SearchServlet.java
      - SingleStarServlet.java

  - #### Explain how Connection Pooling is utilized in the Fabflix code.

    In context.xml, my datasources are configured with parameters like maxTotal, maxIdle, and maxWaitMillis to describe the behavior of the Connection Pooling. Basically, how many connections in the pool, how many idle connections to reuse, and if full the time it takes before failing. Then in my Servlets, they use the Connection Pool by connecting to the data source and instead of creating a new connection each time, they borrow connections from the pool and return them when done.

  - #### Explain how Connection Pooling works with two backend SQL.

    Connection Pooling in a two backend SQL setup manages separate pools for read and write operations. Read queries (both master and slave) get routed to jdbc/moviedbRead, while write operations (master only) go to jdbc/moviedbWrite. This is done to optimize performance and balance the load on the servers. Like mentioned above, connections are connected to a pool rather than creating a new connection each time.

- # Master/Slave

  - #### Include the filename/path of all code/configuration files in GitHub of routing queries to Master/Slave SQL.

    - In /src
      - Write Only (master)
        - AddMovieServlet.java
        - AddStarServlet.java
        - MainParse.java
        - PaymentServlet.java
      - Read (master and slave)
        - EmployeeServlet.java
        - GenresServlet.java
        - LoginServlet.java
        - MetadataServlet.java
        - MoviesServlet.java
        - SearchServlet.java
        - SingleStarServlet.java

  - #### How read/write requests were routed to Master/Slave SQL?

    First, I registered two data sources in web.xml. One for write (master) and one for read (master and slave). Then, in context.xml, I configured the write datasource to connect only to the Master and the read datasource to include both the master and Slave for load balancing. Inside my Servlets, write queries use the Master, while read operations (SELECT) use either master or slave to distribute traffic efficiently. Writes done to master are reflected to the slave.

- # Fuzzy Search

  I used the Flamingo Toolkit to provide a Levenshtein (Edit Distance) Algorithm (LEDA) to implement the fuzzy search. In my search servlet, I used the query

        "AND (MATCH(m.title) AGAINST(LOWER(?) IN BOOLEAN MODE) OR edth(LOWER(m.title), LOWER(?), 3))"

  to find matches to titles that were within 3 distances away from the search term. I made sure to use lower() to remove case sensitivity from the fuzzy searching to ensure more accurate searches.
