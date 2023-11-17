Building a OCI Image 
====================
This tutorial demonstrates how to create a OCI image for a simple web server written in Go, using a multi-stage build process. The Dockerfile consists of two stages: a build stage and a run stage. For more information on multi-stage and other oci optimizations refer to :doc:`/explanation/optimize-oci-image-builder`

Prerequisites
-------------

- OCI installed on your machine, please refer to :doc:`/howto/install-oci-engines`

Step 1: Preparing the Go Source Code
------------------------------------

Create a directory named `src` in your project folder. Inside this `src` directory, create a file named `server.go` with the following content:

.. code-block:: go

   package main

   import (
      "log"
      "net/http"
   )

   func main() {
      http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
         log.Println("Received request:", r.URL.Path)
         w.Write([]byte("Hello from OCI!"))
      })
      log.Println("Starting server on port 8080")
      err := http.ListenAndServe(":8080", nil)
      if err != nil {
         log.Fatal("ListenAndServe: ", err)
      }
   }

Step 2: Writing the Dockerfile
------------------------------

In your project directory, create a file named `Dockerfile` with the following content:

.. code-block:: docker

   # Stage 1: Build stage
   FROM golang:alpine as build-stage
   WORKDIR /app
   # Copy the Go source code
   COPY src/server.go server.go
   # Compile the server
   RUN go build server.go

   # Stage 2: Run stage
   FROM alpine
   # Copy the compiled server from the build stage
   COPY --from=build-stage /app/server /server
   # Expose the port the server listens on
   EXPOSE 8080
   # Command to run the server
   CMD ["/server"]

Explanation
-----------

1. **Build Stage**: The first stage uses `golang:alpine` as the base image. It copies the `server.go` file from the local `src` directory and compiles it.

2. **Run Stage**: The second stage uses a lightweight `alpine` image. It copies the compiled server executable from the first stage and sets the server to listen on port 8080.

Step 3: Building the OCI Image
----------------------------------

Run the following command in your project directory:

.. code-block:: bash

   $ podman build -t my-go-server .

This command builds the OCI image with the tag `my-go-server`.

Step 4: Running the Container
-----------------------------

Once the image is built, run it using:

.. code-block:: bash

   $ podman run -d -p 8080:8080 --name my-go-server  my-go-server

This command runs the container, mapping port 8080 of the host to port 8080 of the container. The `-d` flags makes podman to run the container in the backgroud without attaching the shell into it. For more information about the OCI commands and its options visit :doc:`/reference/oci-commands`.

Verification
------------

To verify if the container is running in your machine in the shell do:

.. code-block:: bash

    $ podman ps
    CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                                       NAMES
    3f3ba02d7732   my-go-server             "/server"                14 seconds ago   Up 12 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   my-go-server

You can also navigate to http://localhost:8080 in a web browser. You should see the message "Hello from OCI!".


Logging
-------

To check the logs you can run the command:

.. code-block:: bash

    $ podman logs my-go-server 
    2013/03/01 00:00:00 Starting server on port 8080

And with that you verify that the server has started.


Getting into the container
--------------------------

You are also able to jump into the container and execute commands there and for example check the contents of the files:

.. code-block:: bash

    $ podman exec -it my-go-server ash
    / # ls
    bin     etc     lib     mnt     proc    run     server  sys     usr
    dev     home    media   opt     root    sbin    srv     tmp     var
    / # 


VSCode
------

If you went for docker installation this is also possible using the docker extensions in vscode. Please refer to :doc:`/howto/docker-vscode`