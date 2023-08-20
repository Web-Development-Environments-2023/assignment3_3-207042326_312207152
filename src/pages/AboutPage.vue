<template>
    <div id="aboutpage">
      <b-card
        style="background-color: transparent"
        header="About Us"
        header-bg-variant="success"
        header-text-variant="blue"        
       >
            <b-card-text class="custom-card-text">
                <br>
                <p>We are Nofar and Shahar, students at BGU University, working on a project that focuses on full stack development.</p>
                <p>Our site is dedicated to providing recipes for every user.<br>
                Whether you're a seasoned chef or just starting out, we have something for everyone.<br>
                Our user-friendly interface, diverse recipe collection, and inclusive approach make cooking enjoyable and hassle-free.                
                <br>
                Join us on a culinary adventure and create unforgettable meals!</p>
                <p> We hope you enjoy our website and we hope we will see you again.
                <br>
                Enjoy!</p>
            </b-card-text>
      </b-card>

    <div class="col-12 d-flex justify-content-center">
    <b-card-group deck >
        <b-card
        style="max-width: 45rem;"
                border-variant="dark"
                header="About Shahar"
                header-bg-variant="dark"
                header-text-variant="white"
                align="center"
                class="w-100"
        >
        <img src="../assets/ralph.png" width= 100%>
            <b-card-text>
                <br>            
                <br>
                <br>
                I worked on website for Ralph Lauren which includes photos and other relevant elements
                <br>
                I chose him because he had a big impact on fashion world  
                <br>
                I you want to take a look you are invited to to it by clicking the link
            </b-card-text>
            <div class="card-body">
                <a href="https://web-development-environments-2023.github.io/312207152/" class="card-link">Click here to visit  </a>
            </div>
        </b-card>

        <b-card 
        style="max-width: 45rem;"
        border-variant="dark"
        header="About Nofar"
        header-bg-variant="dark"
        header-text-variant="white"
        align="center"
        class="w-100"

        > 
            <img src="../assets/tur.jpg" width= 70%>
                <b-card-text>
                    <br>
                    In this exercise, I designed a website for the elderly. 
                    <br>
                    I choose to tell the story about my beloved grandma, who was born in Turkish.
                    <br>
                    You are welcome to take a look at my website.
                </b-card-text>
            <div class="card-body">
                <a href="https://web-development-environments-2023.github.io/assignment1-207042326/" class="card-link">Click here to visit</a>
            </div>
        </b-card>
    </b-card-group>
    </div>

    </div>
</template>


<style scoped>
#aboutpage{
    background-image: url("@/assets/back.png");
    background-size: cover; 
}
.custom-card-text p {
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: bold; 
    line-height: 1.5; 


  }
</style>
