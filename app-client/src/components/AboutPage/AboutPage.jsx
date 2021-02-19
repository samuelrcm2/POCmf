import React from 'react';
import "./AboutPage.css"
const AboutPage = () => {

    return (
        <div className="about-page">
            <h1>POCmf</h1>
            <p>POCmf (Programa de Otimização Computacional de motores de foguetes) 
                in portuguese aims at the design and structural calculation of solid 
                propellant rocket engines. This project is part of the final project for 
                the undergraduate course in Aerospace Engineering at the Federal University 
                of Minas Gerais. The report related to this application can be found at my    
                 <a href="https://github.com/samuelrcm2">Github Page</a></p>
            <p>Feel free to report a bug or a calculus inconsistency, 
                it will be my pleasure to discuss better solutions to this 
                tool and evaluate Pull Requests for other collaborators</p>

            <h1>About Me</h1>
            <p>My name is Samuel and I'm a software developer working most of the time with .NET C# and Angular
                I have a degree in aerospace engineering from the Federal University of Minas Gerais, but 
                I ended up working with software development.</p>   
            <p>Feel free to contact me at my <a href="https://www.linkedin.com/in/samuel-morais-ba3736110/">Linkedin account</a> </p>
        </div>
    );
};

export default AboutPage;