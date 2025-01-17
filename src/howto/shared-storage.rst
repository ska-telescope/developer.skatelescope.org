============================================================
Guide to Sharing Storage Between Namespaces in SKAO Clusters
============================================================

Introduction
------------
This guide provides detailed instructions on how to share storage between pods in different namespaces within Kubernetes (K8s) environments, focusing on the SKAO Clusters. It encompasses best practices and standards for this solution. For a comprehensive technical understanding, visit: `Shared Ceph SubVolumes in K8s <https://confluence.skatelescope.org/display/SE/Shared+Ceph+SubVolumes+in+K8s>`_.

Rules
-----
The shared storage feature is not enabled by default in K8s. An automated process has been developed for this purpose, which requires adherence to specific rules:

1. **Labels Requirements**: The specific labels **skao.int/clone-pvc** and **skao.int/clone-pvc-namespace** need to be set in the metadata path of the PVC
2. **StorageClass Requirement**: Not all StorageClasses allow Shared Volumes, the ones that do are:

   - **ceph-cephfs**
3. **Deletion Order**:  PVCs that are being deleted must be the **last** one to be deleted on the shared chain.

Example
-------
This example demonstrates how to share storage between two pods in different namespaces.

1. **Creating the First PVC**:
   Namespace: **shared-dp**
   PVC Name: **shared-dp-pvc**

   .. code:: yaml

      kind: PersistentVolumeClaim
      apiVersion: v1
      metadata:
        name: shared-dp-pvc
        namespace: shared-dp
      spec:
        accessModes:
        - ReadWriteMany
        resources:
          requests:
            storage: 1Gi
        storageClassName: ceph-cephfs
        volumeMode: Filesystem

2. **Creating a PVC in Another Namespace**:
   Following **rule 1**, this PVC will be pointing to share the same storage as the PVC created in the first step.

   .. code:: yaml

      kind: PersistentVolumeClaim
      apiVersion: v1
      metadata:
        name: second-pvc
        namespace: bang-how-to
        labels:
          skao.int/clone-pvc: shared-dp-pvc
          skao.int/clone-pvc-namespace:  shared-dp
      spec:
        accessModes:
        - ReadWriteMany
        resources:
          requests:
            storage: 1Gi
        storageClassName: ceph-cephfs
        volumeMode: Filesystem

3. **Creating Pods to Test Shared Storage**:
   Pods in both namespaces will use the shared storage.

   .. code:: yaml

      # Pod in shared-dp namespace
      ---
      apiVersion: v1
      kind: Pod
      metadata:
        name: pod1
        namespace: shared-dp
      spec:
        containers:
        - name: container
          image: nginx
          volumeMounts:
          - name: shared-volume
            mountPath: /data
        volumes:
        - name: shared-volume
          persistentVolumeClaim:
            claimName: shared-dp-pvc

      # Pod in bang-how-to namespace
      ---
      apiVersion: v1
      kind: Pod
      metadata:
        name: pod2
        namespace: bang-how-to
      spec:
        containers:
        - name: container
          image: nginx
          volumeMounts:
          - name: shared-volume
            mountPath: /data
        volumes:
        - name: shared-volume
          persistentVolumeClaim:
            claimName: second-pvc

Enforcements
------------
Adherence to the **second and third rules** is essential for ensuring uninterrupted storage and the effectiveness of the automation process. Violations may lead to errors:

- **Violation of Rule 2**: Creating a PVC with the clone labels and the wrong StorageClass name will be blocked.

   .. code:: bash

      resource PersistentVolumeClaim/bang3/shared-dp-pvc was blocked due to the following policies
      validation-shared-pvc-storage-add:
         validation-shared-pvc-storage-add: 'Storage Class does not allow shared storage.
            Classes that do are: ceph-cephfs '


- **Violation of Rule 3**: Attempting to delete the first/main PVC before deleting all other PVs will be blocked to prevent data loss or disruption.

   .. code:: bash

      resource PersistentVolumeClaim/shared-dp/shared-dp-pvc was blocked due to the following policies
      validation-shared-pv-del:
         validation-shared-pv-del: 'This is the first volume created of the shared volume
            group. Please first delete the other Replicated Volumes: ["second-pvc"]'
