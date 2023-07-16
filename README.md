<a name="readme-top"></a>

![logo-no-background](https://github.com/ahmedeid6842/Code-Base/assets/57197702/8898f229-8118-4c1c-8a0b-89a84c60f949)


<h1 align="center">Tickets Microservices</h1>

### 📑 Table of Contents
- [📘 Introduction](#introduction)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites ❗](#prerequisites)
  - [Environment Variables :key:](#environment-variables)
  - [Setup ⬇️](#setup)
  - [Install :heavy_check_mark: ](#install)
  - [Usage 🤿 🏃‍♂️](#usage)
- [🔍 API Reference](#api-reference)
- [🏗️🔨 Architecture](#architecture)
- [👥 Authors](#authors)
- [🤝 Contributing](#contributing)
- [⭐️ Show Your Support](#show-your-support)
- [🔭 Up Next](#up-next)
- [💎 Lessons Learned](#lessons-learned)

## 📘 Introduction <a name="introduction"></a>
<p align="center">
The Ticket App Microservices Backend is a Node.js Typescript-based backend that utilizes microservices architecture to provide a seamless user experience. This backend is composed of several microservices including Auth, Expiration, Common, Order, Payment, and Ticket. Auth handles authentication and authorization, while Expiration uses the Bull package to set expiration time for tickets and delay events for 15 minutes after order creation. Common is an npm package that shares the code of events interfaces. Order handles order creation and cancellation with firing events, Payment handles payment using Stripe, and Ticket handles ticket creation and updates. To handle message streaming between services, this backend uses NATS streaming service built on top of NATS-streaming. 
</p>

<p align="center">
The code is written in Typescript, making use of interfaces, classes, and generators to ensure a well-organized and easily maintainable codebase. Kubernetes service and deployment were used to create a deployment for each service and its database and to build ingress and set up the NATS streaming service. This Ticket App Microservices Backend provides a reliable and efficient backend for your ticket app needs. The Ticket App Microservices Backend is a reliable and efficient solution for ticket app needs, with Mongoose version numbers utilized to solve concurrency issues between services.
</p>


## 🚀 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites ❗<a name="prerequisites"></a>

In order to run this project you need:

 <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=docker,kubernetes&theme=light"/>
    </a>
 </p>

### Environment Variables :key: <a name="environment-variables"></a>

To run this project, you will need to add the following environment variables to your [secrets.yaml](./infra/k8s/secrets.yaml) file

 `JWT_KEY` : string, JSON web token secret <string> (Example: JwtKey)

`SALT_FACTORY`:  number of rounds to create salt for hashing<number> ( Example: 10 )

`STRIPE_KEY`: your stripe API key to handle the payment 

_Note: All environment variables must be encoded in [base64 format](https://www.base64encode.org/)._

### Setup ⬇️ <a name="setup"></a>

Clone this repository to your desired folder:

```bash
cd my-folder
git clone https://github.com/ahmedeid6842/Tickets.git
```

### Install :heavy_check_mark: <a name="install"></a>

Install this project with **[kubectl](https://kubernetes.io/docs/tasks/tools/)** :

```bash
kubectl apply -f ./infra/k8s
```
### Usage 🤿 🏃‍♂️ <a name="usage"></a>

> After following the above instructions, the Kubernetes cluster should be up and running.

- To verify the health of all Kubernetes cluster components and ensure that they are in a ready state, you can run the following command in the terminal: 

```bash
kubectl get all
```

<p align="center"><img src="https://github.com/ahmedeid6842/Vending/assets/57197702/2b7aa64e-8c0c-4724-aa91-83d264694ce8" alt="cluster-health"/> </p>

- Alright, it's showtime! 🔥 Hit `ticketing.dev/api/users/currentuser` and BOOM! 💥 You should see the microservices working like a charm. ✨🧙‍♂️

<p align="center"><img src="https://github.com/ahmedeid6842/Vending/assets/57197702/c3d957c3-da45-4405-add9-3f4abcd20a2e" alt="Postman_Docs_GIF"/> </p>


> _Note: the reason you are receiving `{"currentUser":null}` is because you are not currently logged in. However, this indicates that the services are operational and functioning properly._ 

## 🔍 API Refernce <a name="api-reference"></a>

### Postman 🤩 
Here is the link to the Postman documentation for Tickets: **[Postman Docs - Tickets](https://documenter.getpostman.com/view/10444163/2s946feY8x)**.

 <p align="center"><img src="https://github.com/ahmedeid6842/Vending/assets/57197702/c1b1c78d-b5cb-4c73-96ef-36e75e4c4966" alt="Postman_Docs_GIF"/> </p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏗️🔨 Architecture <a name="architecture"></a>

- Presented here is the general infrastructure diagram for the ticket cluster, illustrating the communication channels utilized by the distinct services to interoperate with one another.

 <p align="center"><img src="https://github.com/ahmedeid6842/Code-Base/assets/57197702/9d3c0317-6115-42bb-bb39-0733573e36d1" alt="Infrastructure"/> </p>


## 👤 Author <a name="author"></a>
**Ahmed Eid 🙋‍♂️**
- Github: [@ahmedeid6842](https://github.com/ahmedeid6842/)
- LinkedIn : [Ahmed Eid](https://www.linkedin.com/in/ahmed-eid-0018571b1/)
- Twitter: [@ahmedeid2684](https://twitter.com/ahmedeid2684)

## 🤝 Contributing <a name="contribution"></a>

We're always looking to improve this project! 🔍 If you notice any issues or have ideas for new features, please don't hesitate to submit a [pull request](https://github.com/ahmedeid6842/Tickets/pulls) 🙌 or create a [new issue](https://github.com/ahmedeid6842/Tickets/issues/new) 💡. Your contribution will help make this project even better! ❤️ 💪

## ⭐️ Show your support <a name="support"></a>

If you find this project helpful, I would greatly appreciate it if you could leave a star! 🌟 💟 

## 🔭 **Up next**

- [ ] Implement validation for incoming requests 🚦
- [ ] Add automated testing for each microservice 🧪
- [ ] Implement "Forgot Password" functionality 💁


## 💎 Lessons Learned

1. Understanding of concurrency issues and techniques to mitigate them.

2. Development of a good interface and base classes using TypeScript to enhance code organization and reusability.

3. Configuration and use of a message broker to facilitate event sharing between microservices.

4. Creation of a robust architecture for the microservices cluster using Kubernetes.

5. There is always something new to learn 👨‍💻.



