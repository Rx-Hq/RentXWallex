<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Rentwallex Application</h3>

 
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#collaborators">Collaborators</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

An application for a property management solution where people who need help to pay rent can borrow money and make payments in installments. The user can manage the activties from the interactive dashboard.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [Next.js](https://nextjs.org/)
* [Node](https://nodejs.org/en)
* [Prisma ORM](https://www.prisma.io/)
* [MongoDB](https://www.mongodb.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

These instructions will guide you through the process of setting up and running the Next app on your local machine. Ensure that you have Node.js and npm installed before proceeding.

### Prerequisites
Frontend (Client):
* Node.js: [Download and install Node.js](https://nodejs.org/en)
* npm (Node Package Manager): npm is included with Node.js installation.
* Prisma ORM Run: [npm i prisma]
* [MongoDB Compass](https://www.mongodb.com/products/tools/compass) and [ MongoDB Atlas](https://www.mongodb.com/atlas)
* [Stripe Payment Account](https://stripe.com/en-ca)

### Installation

1. Clone the repository to your local machine
    ```sh
    git clone <repo URL>
    ```
2. For frontend, navigate to the "client" directory.
   ```sh
   cd RentxWallex
   ```
    1. Install NPM packages
        ```sh
        npm install
        ```
    2. Configure Prisma
        ```sh
        npx prisma generate
        npx prisma db push
        ```
    3. Running the App
       ```sh
       npm run dev
       ```
        (For more running options, see `readme.md` in `client` folder created by React)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Folder Structure

* APIs using Prisma ORM are located in [actions] and [data] folder.
* Components are located in [dashboard/components].
* Mail and Token APIs are located in [lib].
* Types are located in [types.tsx].
* Stripe Checkouts are located in [api] folder.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Code Flow

* Registration and Login.
* Fill the application to get approval.
* Approve the user from MongoDB change to ( ```sh
       isApproved: true
       ```) in UserInfo collection.
* Set up membership and pay using Stripe.
* Borrow money and set up installments.
* Pay money using Stripe.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License
Todo: add license
<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Yemi Ifegbuyi - yemi@cozii.co



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Collaborators

- Gaurav Hariyani ([GIT](https://github.com/RagnarGV), [GMAIL](mailto:gauravhariyani12.gh@gmail.com))
- Vivek Jethva ([GIT](https://github.com/vivekhjtv), [GMAIL](mailto:vivekhjtv18@gmail.com ))
- Smit Shah ([GIT](https://github.com/SmitShah2001), [GMAIL](mailto:smitdshah1901@gmail.com ))
- Rahul Jayswal ([GIT](https://github.com/Rahul21j), [GMAIL](mailto:rahul1353rkj@gmail.com))




<p align="right">(<a href="#readme-top">back to top</a>)</p>

