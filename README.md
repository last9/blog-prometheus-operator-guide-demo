# Overview

This repository contains code files corresponding to the blog post on [Prometheus Operator Guide](https://last9.io/blog/prometheus-operator-guide/).

## Prerequisites

1. Minikube
2. kubectl
3. Node 24
4. npm

## Run on Minikube

Build the app image inside Minikube from this repo's `Dockerfile`, then deploy it:

```sh
minikube image build -t prometheus-operator-demo:local .
kubectl apply -f prometheus-operator-demo.yaml
kubectl port-forward svc/prometheus-operator-demo 8000:80
```

---

# About Last9

This project is sponsored and maintained by [Last9](https://last9.io). Last9 builds reliability tools for SRE and DevOps.

<a href="https://last9.io"><img src="https://last9.github.io/assets/email-logo-green.png" alt="" loading="lazy" height="40px" /></a>
