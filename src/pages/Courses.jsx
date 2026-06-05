import React from 'react';

function Courses() {
  return (
    <section className="section">
      <div className="section-content">

        <div className="course-card">
          <h2>Python for Everyone (Sinhala Medium) | Udemy</h2>
          <p>
            Python is currently a very popular programming language that can be used in any
            field. This course is fully designed to be easy for anyone to understand and to
            get started. Additionally, essential concepts in programming, such as
            Object-Oriented Programming, Multi-threading, and Error Handling, are available
            here for free learning. After this, you’ll be able to study a relevant Python
            framework and enter any field of your choice.
          </p>
          <a className="btn" href="https://www.udemy.com/course/python-for-everyone-sinhala-medium" target="_blank" rel="noreferrer">
            Enroll Now
          </a>
        </div>

        <div className="course-card">
          <h2>Advanced Generative AI | Loku Business</h2>
          <p>
            This Generative AI Course can be described as a practically oriented program. It
            provides a comprehensive understanding of creating various applications using
            Large Language Models and Vision Models. The course is primarily organized to
            guide you in building complete GenAI applications using different libraries and
            frameworks. It also covers how the state of art AI models for text, image, audio,
            and video generation work and how you can utilize them to streamline your tasks.
          </p>
          <a className="btn" href="https://school.lokubusiness.lk/p/advanced-generative-ai1" target="_blank" rel="noreferrer">
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default Courses;
