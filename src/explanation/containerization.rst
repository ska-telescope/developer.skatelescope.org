Containerization and OCI Engines
================================

Containerization has revolutionized how applications are deployed and managed, making it an essential component of modern software development and deployment. We will go over the concept of containerization, comparing it with traditional virtual machines (VMs). We will also go over the most popular OCI engines: Docker, Podman, and containerd.

What is Containerization?
-------------------------

Containerization is a **lightweight** form of virtualization that involves encapsulating an application and its dependencies into a running **container**. Unlike VMs that require a full-blown operating system, containers **share** the host system's kernel, making them more efficient, portable, and resource-friendly. Dependencies, configurations and resources can be packaged in a distributable resource - an image. This image can be executed on any compatible host system, ensuring that the application runs **consistently** regardless of where it is deployed. 

Why Use Containerization Over Virtual Machines?
-----------------------------------------------

**Efficiency**: Requires less system resources than VMs as they don’t include operating system images.

**Speed**: Start up quickly as no OS boot is needed.

**Portability**: Ensure consistency across multiple development, testing, and production environments.

**Isolation**: Provide process and file system isolation, which improves security.

**Scalability**: Multiple containers can be created on a single or many host machines to easily scale the deployment.

**Versatility**: Enables more complex and versatile software architectures (e.g., micro-services).

The Open Container Initiative (OCI)
-----------------------------------

The Open Container Initiative (OCI) is a significant project in the realm of container technology, aiming to establish standard specifications for containers across platforms. The OCI was formed in June 2015 by Docker, Inc. and other leaders in the container industry. It operates under the auspices of the Linux Foundation. Its primary goal is to create open industry standards around container formats and runtime. This ensures that container solutions are interoperable and can work across different environments and platforms.

The OCI provides the following key components:
  - **OCI Runtime Specification**: Outlines the standards for running a container, covering configuration, execution environment, and lifecycle.
  - **OCI Image Specification**: Specifies how to create a container image, including the application code, runtime dependencies, manifest, and image index.

The OCI is a major breakthrough in democratization of technology and the standardization of containerization. Here is why:

- **Interoperability and Standardization**: Ensures containers are compatible across various systems and platforms, promoting consistency and reliability.
- **Vendor Neutrality**: Prevents vendor lock-in, offering users the freedom to choose among different container technologies.
- **Community and Collaboration**: Facilitates a collaborative environment among industry leaders and contributors. Operates under an open governance model for transparent, community-driven standard development.
- **Enhancing Security**: Helps in defining and adhering to security best practices in containerization.

To know more about it, please visit the `OCI official documentation <https://opencontainers.org>`_.

OCI Engines
-----------

An OCI (Open Container Initiative) engine refers to a software component that can create, run, and manage containers based on the specifications outlined by the Open Container Initiative. Aside from the examples below, **runC** or **CRI-O** are also options to run containers.

Docker
~~~~~~

Docker is a platform that revolutionized software containerization, making it simpler to create, deploy, and run applications by using containers. It is still the most used containerization engine, much because it brings a lot more that the engine itself.

- **Docker Hub**: A cloud-based registry service for sharing and managing container images. Look into :doc:`explanation/oci-registries` to know more about registries.
- **Docker Compose**: A `tool <https://docs.docker.com/compose/>`_ for defining and running multi-container Docker applications, including network and storage. 
- **Docker Swarm**: A `tool <https://docs.docker.com/engine/swarm/>`_ to manage a cluster of Docker daemons (i.e., machines running Docker).

Podman
~~~~~~

Unlike Docker that runs as a client-server architecture, where the Docker daemon is the server, Podman is designed as a **daemonless** container engine. It does not require a running daemon to function, which simplifies the architecture and enhances security. It is generally compatible with Docker's CLI interface, making it smooth learning curve between the platforms. As both engines abide by the OCI, they can run and manage the same images.

- **Daemonless architecture**: Increases security and reduces complexity.
- **Rootless mode**: Allows users to run containers without root privileges.
- **OCI-compliant**: Compatible with standards defined by the Open Container Initiative.
- **Pod concept**: Groups multiple containers into a single entity for easier management.

Containerd
~~~~~~~~~~

Containerd is an **industry-standard** container runtime with an emphasis on simplicity, robustness, and portability. It's a core component of **Docker** (since 1.11) but is also designed to be embedded into larger systems, like **Kubernetes**.

As it primarily acts as a container runtime, needs other tools to perform other tasks that more complete engines provide. To build images, we can use Docker, Podman or `Buildah <https://buildah.io/>`_, among other options. It also has its own CLI - **ctr** - to manage the containers, this time not compatible with Docker or Podman's CLI.
