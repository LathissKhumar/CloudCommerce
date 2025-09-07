# Cloud Kubernetes Setup Guide

## AWS EKS Setup

### Prerequisites:
- AWS CLI installed and configured
- eksctl installed

### Setup Commands:
```bash
# Install eksctl (Windows)
choco install eksctl

# Create EKS cluster
eksctl create cluster --name cloudcommerce --region us-west-2 --node-type t3.medium --nodes 2

# Configure kubectl
aws eks update-kubeconfig --region us-west-2 --name cloudcommerce
```

## Google GKE Setup

### Prerequisites:
- Google Cloud SDK installed
- Project created in GCP

### Setup Commands:
```bash
# Install gcloud CLI
# Download from: https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Create GKE cluster
gcloud container clusters create cloudcommerce \
    --zone us-central1-a \
    --num-nodes 2 \
    --machine-type e2-medium

# Configure kubectl
gcloud container clusters get-credentials cloudcommerce --zone us-central1-a
```

## Azure AKS Setup

### Prerequisites:
- Azure CLI installed
- Resource group created

### Setup Commands:
```bash
# Install Azure CLI
# Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create --name cloudcommerce-rg --location eastus

# Create AKS cluster
az aks create \
    --resource-group cloudcommerce-rg \
    --name cloudcommerce \
    --node-count 2 \
    --node-vm-size Standard_DS2_v2 \
    --enable-addons monitoring

# Configure kubectl
az aks get-credentials --resource-group cloudcommerce-rg --name cloudcommerce
```

## DigitalOcean Kubernetes

### Prerequisites:
- DigitalOcean account
- doctl CLI installed

### Setup Commands:
```bash
# Install doctl
# Download from: https://github.com/digitalocean/doctl/releases

# Authenticate
doctl auth init

# Create cluster
doctl kubernetes cluster create cloudcommerce \
    --region nyc1 \
    --node-pool "name=worker-pool;size=s-2vcpu-2gb;count=2"

# Configure kubectl
doctl kubernetes cluster kubeconfig save cloudcommerce
```

## Verification Commands

After setting up any cluster:
```bash
# Check cluster connection
kubectl cluster-info

# Check nodes
kubectl get nodes

# Check namespaces
kubectl get namespaces
```
