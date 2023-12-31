import React,{useState} from 'react'
import style from "./Enquiry.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {API} from '../../Backend';
import axios from 'axios';

const Enquiry = () => {
    const initialarray = {
        organisation: "",
        username: "",
        contact: "",
        email: "",
        location: "",
        date: "",
        message: "",
      };
    
    const [values, setValues] = useState(initialarray);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post(`${API}/api/user/enquiry`,values).then((res)=>{
          if(res.status===200){
            setSuccess(true)
            setValues(initialarray);
          }
        }).catch((err)=>{
          displayError(err.response.data.message)
        })
      };

    const displayError=(message)=>{
      setError(message)
      setTimeout(()=>{
        setError(null)
      },3000)
    }

    return (
        <>
      <div className="p-0 w-full bg-white">
        <div className={`${style.pizza_enquiry}`}>
          <div className={`${style.pizza_party_container}`}>
            <section className={`text-center`}>
              <LazyLoadImage
                className={`${style.section_img}`}
                src="/images/banner.svg"
                alt="section_img_banner"
                placeholderSrc="/images/placeholder-image.png"
              />
            </section>
            <section className={`${style.section} md:text-center`}>
              <p className={`${style.section_title} text-center`}>
                Work together, Eat together
              </p>
              <p className={`${style.section_text} text-center`}>
                As virtual parties have become the new way to bond and enjoy
                together,it's time to up these unique celebrations with a unique
                feast.
              </p>
              <LazyLoadImage
                // effect="blur"
                src="/images/Hungry2.svg"
                alt="section_img"
                placeholderSrc="/images/placeholder-image.png"
              />
            </section>
            <section
              className={`${style.section} ${style.background_grey} text-center`}
            >
              <p className={`${style.section_title} md:text-center`}>
                Great taste,Delievered Safe
              </p>
              <p className={`${style.section_text2}`}>
                At Hungry we understand the growing concerns regarding food
                safety and hygiene. That’s why we take all the necessary
                precautions and follow strict safety ad hygiene protocols while
                making delivering your food. So, you can enjoy your safe virtual
                celebrations with the safest ever virtual feast.
              </p>
              <LazyLoadImage
                className={`${style.section4_img}`}
                src="/images/enquirypizza.png"
                alt="section_img"
                placeholderSrc="/images/placeholder-image.png"
              />
            </section>
            <section className={`${style.section} text-center`}>
              <p className={`${style.section_title} md:text-center`}>
                celebrations made easy
              </p>
              <p className={`${style.section_text2}`}>
                Convert your work from home into party from home with Hungry's
                Virtual Feast. Order some good old favourites from Hungry and
                celebrate with your colleagues in a new and safer way.
              </p>
              <LazyLoadImage
                className={`${style.section4_img}`}
                src="/images/celebration.png"
                alt="section_img"
                placeholderSrc="/images/placeholder-image.png"
              />
            </section>
            <hr className={`${style.separator}`} />
            <section className={`${style.section}`}>
              <p className={`${style.section_text_bold} ${style.text_grey} `}>
                Feel free to write to us at
              </p>
              <p className={`${style.section_text_bold}`}>
                hungrypiz83@gmail.com
              </p>
            </section>
          </div>
          <div className={`${style.form}`}>
            {success ? (
              // success body
              <div className={`${style.form_body}`}>
                <div className={`${style.success_div}`}>
                  <LazyLoadImage
                    class={`${style.success_icon}`}
                    src="/images/check.png"
                    alt="success-icon"
                    placeholderSrc="/images/placeholder-image.png"
                  />
                  <p className={`${style.success_title}`}>Thank You!</p>
                  <p className={`${style.success_description}`}>
                    Thank you for your interest. We will contact you within 48
                    hours. In case of any other query you can also reach us at{" "}
                    <a href="mailto:hungrypiz83@gmail.com">
                      hungrypiz83@gmail.com
                    </a>{" "}
                    with the subject 'Corporate Enquiry'.
                  </p>
                </div>
              </div>
            ) : (

              <div className={`${style.form_body}`}>
                <p className={`${style.form_title}`}>Contact Us</p>
                <p className={`${style.form_subtitle}`}>
                  Please let us know your query
                </p>
                {/* Form For submitting the query */}
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      type="text"
                      value={values.username}
                      name="username"
                      placeholder="UserName"
                      onChange={(e) =>
                        setValues({ ...values, username: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      type="text"
                      value={values.organisation}
                      name="organisation"
                      placeholder="Organisation Name"
                      onChange={(e) =>
                        setValues({ ...values, organisation: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      value={values.contact}
                      name="contact"
                      maxLength="10"
                      placeholder="Contact Number"
                      onChange={(e) =>
                        setValues({ ...values, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      type="email"
                      value={values.email}
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      type="text"
                      value={values.location}
                      name="location"
                      placeholder="Location"
                      onChange={(e) =>
                        setValues({ ...values, location: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <input
                      className={`${style.form_input}`}
                      type="date"
                      value={values.date}
                      name="date"
                      placeholder="Date"
                      onChange={(e) =>
                        setValues({ ...values, date: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${style.form_input_container}`}>
                    <textarea
                      className={`${style.form_input}`}
                      maxLength="350"
                      value={values.message}
                      name="message"
                      placeholder="Your query"
                      onChange={(e) =>
                        setValues({ ...values, message: e.target.value })
                      }
                    />
                  </div>
                {error!==null &&<span style={{color:'#fc283f'}}> {error}</span>}

                  <div>
                    <button
                      className={`${style.form_button} root_button`}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    )
}

export default Enquiry