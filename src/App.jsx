import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "./assets/images/1.jpg";
import image2 from "./assets/images/2.jpg";
import image3 from "./assets/images/3.jpg";
import image4 from "./assets/images/4.jpg";

const App = () => {
  const courses = [
    {
      id: 1,
      title: "Al-Qawāʿid al-Arbaʿ",
      instructor: "Shaykh Muhammad ibn ‘Abdul-Wahhāb",
      description: "القواعد الأربع للشيخ محمد بن عبد الوهاب",
      imageUrl: image1,
      link: "https://youtube.com/playlist?list=PLt11glGomoV3C1spZiZywOZOB5mYs7NQm&si=8GaES3aiea7vQDOJ"
    },
    {
      id: 2,
      title: "Thalāthat-ul-Uṣool",
      instructor: "Shaykh Muhammad ibn ‘Abdul-Wahhāb",
      description: "ثلاثة الأصول للشيخ محمد بن عبد الوهاب",
      imageUrl: image2,
      link: "https://youtube.com/playlist?list=PLt11glGomoV3x7_lEOUgZEPoo9d99UN5C&si=wwWKpQiqftKm8coR"
    },
    {
      id: 3,
      title: "Kashf ash-Shubuhāt",
      instructor: "Shaykh Muhammad ibn ‘Abdul-Wahhāb",
      description: "كشف الشبهات للشيخ محمد بن عبد الوهاب",
      imageUrl: image3,
      link: "https://youtube.com/playlist?list=PLv0gppFQn8KztTOUbzyx0jtr6_TE0MMpo&si=vOgiBA6nvNWRhAah"
    },
    {
      id: 4,
      title: "Kitāb at-Tawḥeed",
      instructor: "Shaykh Muhammad ibn ‘Abdul-Wahhāb",
      description: "كتاب التوحيد للشيخ محمد بن عبد الوهاب",
      imageUrl: image4,
      link: "https://youtube.com/playlist?list=PLqrNM_MyAebyRSHoJ3niw6OkoL4btpL0Z&si=554WeE6MiVvGtgmZ"
    }
  ];

  return (
    <div className="container my-4">
      <header className="mb-5" style={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        padding: '2rem',
        borderRadius: '10px',
        color: 'white'
      }}>
        <div className="d-flex align-items-center mb-4">
          <span 
            className="bg-white" 
            style={{ width: "4px", height: "16px" }}
          ></span>
          <p 
            className="ms-2 mb-0 text-uppercase" 
            style={{ letterSpacing: '1px', fontSize: '0.85rem' }}
          >
            Student Journey
          </p>
        </div>
        <h1 className="fw-bold text-center fs-2 fs-md-1">
          'Aqeedah & The Foundations of The Religion
        </h1>
        <p className="fs-5 fw-bold text-center">
          العقيدة وأصول الدين
        </p>
        <hr 
          className="mx-auto" 
          style={{ width: "200px", height: "2px", opacity: "0.5", backgroundColor: "white" }} 
        />
      </header>

      <div className="text-center mb-4">
        <button className="btn btn-dark fw-bold px-4 px-md-5">BASIC</button>
      </div>

      <div className="row justify-content-center g-4">
        {courses.map((course, index) => (
          <div key={course.id} className="col-12">
            <div className="card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid #dee2e6',
              boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-3 p-md-4">
                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="rounded"
                    style={{ 
                      width: "100%", 
                      maxWidth: "250px",
                      height: "150px", 
                      objectFit: "cover" 
                    }}
                  />
                  <div className="flex-grow-1 text-center text-md-start">
                    <div className="d-flex flex-column flex-md-row align-items-center mb-2 gap-2">
                      <span 
                        className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "35px", height: "35px", minWidth: "35px" }}
                      >
                        <span className="fw-bold">{index + 1}</span>
                      </span>
                      <div>
                        <h5 className="card-title mb-1 fw-bold text-dark">{course.title}</h5>
                        <p className="card-text mb-0 text-secondary">By {course.instructor}</p>
                        <p className="card-text small mb-0 text-muted">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-dark fw-bold px-4 py-3"
                    style={{ 
                      borderRadius: '50px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    START LEARNING
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;