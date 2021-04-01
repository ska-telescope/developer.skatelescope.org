
A Quick Introduction to Kubernetes
==================================

This page is based on a talk given by Piers Harding in July 2020, and provides an SKA-specific overview of `Kubernetes <https:// https://kubernetes.io/>`_. Further details can be found in  :doc:`Container Standards <containerisation-standards>` and :doc:`orchestration-guidelines`.

What is Kubernetes?
--------------------

Kubernetes is an abstraction layer to allow you to manage containerised applications. To run an application, you need compute, network and storage, so Kubernetes defines resources that allow you to manage these things. The Kubernetes resources are a mechanism whereby you can refer to compute, network, storage in terms of abstract names, without having to address the underlying hardware directly.

These defintions work in terms of applied semantics and eventual consistency. If you create a resource such as a Pod (a Pod is the smallest unit of compute that you can manage in Kubernetes), and then update that resource, the Kubernetes system will do its best to nudge or coerce that Pod into the new state that you've defined. It works out the delta betwen the old and new resource definitions, and then tries to apply changes to update to the new state. So all you need to know is how you want the Pod to look at some point -- you don't need to calculate and implement the deltas yourself.

Similarly, as part of the inbuilt health checking, Kubernetes will, if it finds a Pod in an unexpected state, try to nudge it back to the expected state. So if for some reason a node (an actual server) on your Kubernetes cluster goes away, the Pods scheduled on those nodes will be re-load-balanced onto the remaining nodes on the cluster, once the problem is detected.

Compute
----------

From a compute point of view, the basic unit is the container, and the Pod is made up of one or more containers. Those containers in that Pod are effectively blessed into the same network namespace (the cluster namespace), and the actual process namespace can be shared as well. When a Pod is defined, kubernetes starts an initial process within the namespace, and this is the "head" of what a Pod is. So if any containers attached within this namespace fail, the whole application doesn't fall over, because that head process is guaranteed to remain. So the list of the containers you define in a Pod gets booted up in the associated namespace given to that Pod.

Quick Note on Kubernetes Namespaces
````````````````````````````````````
Namespacing allows you to define the scope of things, in a general computer science sense. A Kubernetes cluster has a single networking address space, to allow the Kubernetes scheduler (``kube-scheduler``) to place jobs throughout the cluster. You can also deploy Pods to a specified Namespace (a Kubernetes construct as opposed to a Linux Kernel namespace for OS level network issolation), and that Namespace is isolated from other Namespaces in the cluster. So this allows you to deploy (for example) different versions of the same container, with the same Pod and Service (akin to a DNS name) names for testing purposes.

Scheduling Compute
------------------
For a horizontally scaling process, such as a web application, you deploy more of these pods to get horizontal scaling. You define how to deploy your Pods. You can use a ``Deployment`` (which in turn uses a ``ReplicaSet``) to define how many of these Pods you want running, and what the scheduling constraintes are -- such as where in the cluster you wish to permit them to run or not run. (A good use case here is if you have some parts of your application GPU-enabled, you want those Pods to run on GPU nodes, and the non-GPU parts of the application to run on nodes that don't have GPUs.) Kubernetes then takes that ReplicaSet definition and figures out where in the cluster it can run, boots up the Pods, and sorts out the networking between the Pods.

As well as Deployments, we have StatefulSets. This is essentially a specialisation of a Deployment. It guarantees the ordering and naming of the individual Pods within the set. So if you have a StatefulSet with replicas set to >1, the Pods will have an incremental number attached to the name you gave the StatefulSet (so my-app01, my-app02, my-app03...). These are guaranteed network stability, so within the cluster, they are guaranteed to keep their IP address when restarted. This is ideal for things like databases and services where you want stability (i.e. where you wish to maintain state!)

The other major thing guaranteed by StatefulSets is that if you scale them up and down, they'll behave like a popping stack. So having created Pods 01, 02, 03..., 03 is removed first. With a Deployment, order is not meant to be important, so if you scale down, Kubernetes will remove a Pod from the Deployment as it sees fit.

Then there are DaemonSets. These are very good for some of the key OS/unix style services you want to emulate in the cluster. A DaemonSet will guarantee to have onely one of these scheduled on each physical node within the cluster, based on scheduling rules and affinity rules. (So you can deploy DaemonSets to a subset of your cluster if you wish.) This is particularly good for when you need some specific plugin service running, such as logging or monitoring; thus you can use a Daemonset to get logs from each host on the cluster.

The last scheduling solution is a Job. Jobs are one-shot pods that run to completion. You can basically allocate Pods in the same way as sets -- you can create and tear down services also. The Pod can contain any number of containers, and the Pod will run to completion. A 0 exit code indicates success. All other deployment types expect to be up at all times, and they don't complete unless there's an error, in which case the error will be caught by the health monitoring. You can also cron your Jobs (just like on Unix), so they run at a regular cadence.

We have some configurator jobs to set up services, such as a Job to set up the Tango database server for TMC.

Note that failed Pods aren't immediately garbage collected. In a production environment, you set rules that mean Pods are garbage collected after 24 hours, so you have a chance to grab the Pod logs (if it's not already collected by your logging system), and then you might see why the Pod failed.

Beware! Some Pods return an exit code of 2 on successful update. This is incorrect from a Unix point of view. We've tried to wrap and catch it in most places (eg: ``dsconfig``).

With skampi at the moment there are complex dependencies and some pods needs to come up in a particular order. At the moment, we're using a StatefulSet to enforce ordering.

Networking
----------
So you've deployed a lot of Pods to the cluster to compute somthing. How do you expose these Pods you've scheduled to the cluster, so they can talk to each other?

There are two main methods for doing this: a Service resource and an Ingress resource. A Service is a way of exposing particular services, load-balanced across the associated Pods, usually related to a single deployment or StatefulSet (or even a DaemonSet).

A Service specifies a to-and-from port (or a series of them) that is to be exposed, translating the port(s) that are open to data on the associated Pods, and associating it with a Pod on the Service. The way it works out which Pods to provide this service for is based on label matching. So you need to get this right, otherwise you could mash together two different deployments! So you need to label your Pods and Sets properly, otherwise your Service will break.

Services help translate requests (such as a database request or a push to a message queue) in to the internal Kubernetes DNS for the cluster. The first scope is the namespace of the cluster you're running in. This becomes the first level of the DNS name. This first level is the Service name itself. So if you're running Jupyter, you'll define (say) a ReplicaSet and put a Service resource in front of it. That Service maps the ports of the jupyter web service listening within the Pods to a port and IP it exposes. You might name the Service ``jupyter`` and if it's running the in ``j-hub`` namespace, inside the cluster it's now referred to as ``jupyter.j-hub``. This is the primary method of service discovery within the Kubernetes cluster.

A Pod *can* communicate with another pod without putting a service in front of it, but there's no stability in the reference names. You might have deployed a bare Pod yourself, outside a ReplicaSet. That does have a fixed name, but then there's no health checking or monitoring associated with that bare Pod, and thus there's no auto-healing. So to get auto-healing *and* reference stability, you need a ReplicaSet/some other schedulable deployment mechanism, and a Service. Bare Pods are vigorously discouraged in Kubernetes as an anti-pattern.

Because there are no guarantees of naming within Pods, the labelling schemes allow Services to provide a bridge between the Pods and the fixed IP front end within the cluster. Typically, a Service will have a cluster IP address (there are other ways of doing it, but we'll stick to this method) which you can use to communicate with the Pods managed by the Service. This address is resolved by DNS (Domain Name Services) within the cluster. On top of this you get load-balancing schemes, such as random, round-robin, or even sticky (this isn't usually a good idea, but may be needed for some legacy applications like R ShinyApps).

The Service load-balancer means that if a Pod fails, the Kubernetes components in the Service will automatically notice (via health checking)  and drop it from the load balander, so you don't get dead endpoints.

However, Services are primarily for communication within the cluster. So to communicate with the outside world (whether the internet, a VPN, basically anything that isn't your Kubernetes cluster), you need an Ingress Controller. An Ingress Controller is a point of entry or exit to the outside world within the cluster. You do a further mapping exercise based on the Service name and port names together with the URI to define which Services within the cluster should be exposed to the outside world, and how they should be exposed. This is HTTP-based.  For TCP based applications, a Service type of Loadbalancer can be used to create a network mapping from the internally running Pods to the outside world.  However this is only possible if the underlying Kubernetes infrastructure supports these kinds of Load Balancers eg: OpenStack Octavia.

How does this impact latency? Historically, this was done with ``iptables`` rules (rules that control communication and routing for the Pod network), and is moving to IPVS (basically, like iptables, but faster). This is because the iptables rulesets get very big. The bigger the cluster, and the more stuff you're running, the more enormous they get.

Mostly, the cluster network is controlled by 3rd party solutions. We're using Calico, which works quite efficiently with a flat network (it is configured to bind at Layer2). These solutions mean that if you try to route between two Pods on the same node, the iptables should encode this, and make sure that the route between those two Pods never goes off-node. If there's a hop between hosts, iptables should also encode this. Calico is an intelligent routing service, and it will route in the most efficient way it can. It's referred to as an overlay network.

If latency is a problem, you can use affinity rules to place the Pods on the same node. This is most important if you don't have control over node placement (e.g. when you're working on the public cloud). From a Pod perspective, it's dealing with a local subnet in the data centre. So in one way, the Pod is its own little computer, with a network, compute, and storage -- hence the comparisons between pods, containers, and VMs.

Storage
-------
A PersistentVolume is an abstraction from the actual physical implementation of the underlying storage solution. This abstraction is manifested though StorageClass names. So when you create a PersistentVolumeClaim, you specify a StorageClass, which is an abstract concept and the underlying storage engine will go away and allocate that piece of storage and then mount it wherever it needs to be (Node). Then the Pod which wants to use that storage can find it and access it as a filesystem.

The StorageClasses can have different characteristics. So within the kubernetes clusters of SKA, we have two fundamental storage types. One is block, and you can only mount that for :ref:`read-write-once`, so its primary use case would be running something like a database, and then you write to storage from within the database engine.

The other storage type we're supporting is NFS (network file system). Currently, we implement both types using Ceph, but there's nothing stopping us taking our deployment to AWS or the Google Cloud Platform, and using their storage solutions and creating alias StorageClass names for NFS and block, and deploying our workloads there. We wouldn't have to change our resource descriptions, because we have this abstraction between what we call storage and the characteristics we want to have for that type of storage, and how it's actually physically implemented on the platform.

Some older storage engines require you to define a PersistentVolume, which is a low-level addressing of a lump of storage (e.g. a StorageClass). A PersistentVolumeClaim is a claim to mount that lump of storage which turns the abstract StorageClass into a reality. This may not have been the best idea. The Ceph implementation doesn't use the PersistentVolume concept at all -- you just describe a PersistentVolumeClaim, declaring the StorageClass you want and how much storage you want there to be, and basically it does it all in one operation.

Then the volume you've created becomes available to the Pod. So the NFS storage is read-write many. That's ideal for web-based or horizontally scaling applications, where you need many instances of the application running, all needing concurrent access to that storage to read-write (like they all need to access the content for web pages). Block storage gives raw access, NFS is through a posix-style interface. So there are tradeoffs to the different types of storage and performance characteristics.

.. _read-write-once:

What is read-write once versus read-write many?
```````````````````````````````````````````````

Read-write once/many refers to the number of times you can mount that piece of storage into a running container. So for a database, it makes sense to mount that storage once, to the container running the database engine. Read-write many means that multiple containers can mount the storage, so you can have multiple Pods all reading out content for your web page, for example.

Resource Management
-------------------

We can put limits on CPU, memory, and storage, so that we can control resource usage across the cluster.

At the Pod level, you can set two things: a request, and a limit. Request is usually set to lower than the limit. The request is what you expect the Pod to need in normal usage -- i.e. the Pod's normal consumption of resources -- and the limit is the upper bound. If the Pod hits the limit, you expect that there is something wrong, and it's thus a Pod health issue. So if the Pod exceeds those limits, the Kubernetes scheduler would mark the Pod for eviction and then evict it. The kubelet on each host monitors this. When the kubelet gets the scheduling requirements from the kube-controller, it knows what the limits are for the Pod it's about to launch, and then it monitors that Pod.

Eviction doesn't happen instantaneously. There are global policies about when something gets evicted. But things that do exceed their resource limits will get evicted in a certain amount of time. We do have monitoring, so you can look at the resources your Pod is using.

