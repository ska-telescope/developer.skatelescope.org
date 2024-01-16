============================================================
Guide to Sharing Storage Between Namespaces in SKAO Clusters
============================================================

Introduction
------------
This guide provides detailed instructions on how to share storage between pods in different namespaces within Kubernetes (K8s) environments, focusing on the SKAO Clusters. It encompasses best practices and standards for this solution. For a comprehensive technical understanding, visit: `Shared Ceph SubVolumes in K8s <https://confluence.skatelescope.org/display/SE/Shared+Ceph+SubVolumes+in+K8s>`_.

Rules
-----
The shared storage feature is not enabled by default in K8s. An automated process has been developed for this purpose, which requires adherence to specific rules:

1. **Naming Convention**: All shared PVCs must follow the regex pattern **shared-***.
2. **Consistent Naming**: All shared PVCs across different namespaces must have the **same name**, such as `shared-dp-mccs`.
3. **StorageClass Requirment**: Not all StorageClasses allow Shared Volumes, the ones that do are: 
   
   - **ceph-cephfs**
4. **Namespace Requirement**: The first PVC must be in a namespace matching the regex pattern **shared-***.
5. **Deletion Order**: The first PVC must be the **last** one to be deleted.

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
      storageClassName: nfss1
      volumeMode: Filesystem

2. **Creating a PVC in Another Namespace**:
   Following **rule 2**, this PVC will have the same name, **shared-dp-pvc**, in the namespace **bang-how-to**.

   .. code:: yaml

      kind: PersistentVolumeClaim
      apiVersion: v1
      metadata:
         name: shared-dp-pvc
         namespace: bang-how-to
      spec:
      accessModes:
         - ReadWriteMany
      resources:
         requests:
            storage: 1Gi
      storageClassName: nfss1
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
            claimName: shared-dp-pvc

Enforcements
------------
Adherence to the **third, fourth and fifth rules** is essential for ensuring uninterrupted storage and the effectiveness of the automation process. Violations may lead to errors:

- **Violation of Rule 3**: Creating a PVC with the prefix **shared-*** with the wrong StorageClass name.

   .. code:: bash

      resource PersistentVolumeClaim/bang3/shared-dp-pvc was blocked due to the following policies
      validation-shared-pvc-storage-add:
         validation-shared-pvc-storage-add: 'Storage Class does not allow shared storage.
            Classes that do are: ceph-cephfs '

- **Violation of Rule 4**: Creating a PVC with the prefix **shared-*** as the first in its group outside a namespace starting with **shared-*** will be blocked.

   .. code:: bash

      resource PersistentVolumeClaim/bang3/shared-dp-pvcss was blocked due to the following policies
      validation-shared-pv-add:
         validation-shared-pv-add: This is the first volume created of the shared volume
            group. So it needs to be inside a namespace starting with shared-*

- **Violation of Rule 5**: Attempting to delete the first/main PVC before deleting all other PVs will be blocked to prevent data loss or disruption.

   .. code:: bash

      resource PersistentVolumeClaim/shared-dp/shared-dp-pvc was blocked due to the following policies
      validation-shared-pv-del:
         validation-shared-pv-del: 'This is the first volume created of the shared volume
            group. Please first delete the other Replicated Volumes: ["pvc-899bf991-53d5-49d5-806d-be7c18e93ce1-bang-how-to"]'
