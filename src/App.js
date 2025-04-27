import { useEffect, useRef } from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Observer from 'gsap/Observer';
import './App.css';
import { useGSAP } from '@gsap/react';
import Teachers from './Teachers';
import "./courses.css";
import clg from "./assets/clg.png";
import Lottie from 'lottie-react';
import registration from './assets/registration.json';
import contact from './assets/hNbDVxVmeF.json';


gsap.registerPlugin(ScrollTrigger, Observer);


function App() {
  const coursesRef = useRef(null);

  var currentIndex = -1;
  let animating = false;

  let sectionsRef = null;
  let outerWrappers = null;
  let innerWrappers = null;
  let splitHeadings = null
  let images = null;
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);


  function gotoSection(index, direction) {
    if (index < 0 || index > 4) {
      return
    }
    console.log(index);
    console.log(currentIndex);

    sectionsRef = gsap.utils.toArray('section');
    outerWrappers = gsap.utils.toArray('.outer');
    innerWrappers = gsap.utils.toArray('.inner');
    splitHeadings = gsap.utils.toArray('h2');
    images = gsap.utils.toArray('.bg');

    // gsap.set(outerWrappers, { yPercent: 100 });
    // gsap.set(innerWrappers, { yPercent: -100 });
    animating = true;
    let fromTop = direction === -1, dFactor = fromTop ? -1 : 1;
    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => animating = false
    });


    if (currentIndex >= 0) {
      // The first time this function runs, current is -1
      gsap.set(sectionsRef[currentIndex], { zIndex: 0 });
      tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(sectionsRef[currentIndex], { autoAlpha: 0, });
    }
    gsap.set(sectionsRef[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]], {
      yPercent: i => i ? -100 * dFactor : 100 * dFactor,
    }, {
      yPercent: 0
    }, 0)
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(splitHeadings[index], {
        autoAlpha: 0,
        yPercent: 200 * dFactor
      },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: "power2",
          // delay:2
        });

    if (index == 1) {
      gsap.fromTo(box2.current, { yPercent: -600, xPercent: -600, opacity: 0.7, ease: Power3.easeOut, },
        { yPercent: 0, xPercent: 0, ease: Power3.easeOut, opacity: 1, duration: 2.5,  })

      gsap.fromTo(box3.current, { yPercent: -600, xPercent: 600, opacity: 0.7, ease: Power3.easeOut,  },
        { yPercent: 0, xPercent: 0, ease: Power3.easeOut, opacity: 1, duration: 2.5, })

      gsap.fromTo(box4.current, { yPercent: 600, xPercent: -600, opacity: 0.7, ease: Power3.easeOut, },
        { yPercent: 0, xPercent: 0, ease: Power3.easeOut, opacity: 1, duration: 2.5,  })
      gsap.fromTo(box5.current, { yPercent: 600, xPercent: 600, opacity: 0.7, ease: Power3.easeOut, },
        { yPercent: 0, xPercent: 0, ease: Power3.easeOut, opacity: 1, duration: 2.5, })
    }





    currentIndex = index;
  };


  Observer.create({
    type: "wheel,scroll,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true
  });

  useGSAP(() => {


    sectionsRef = gsap.utils.toArray('section');
    outerWrappers = gsap.utils.toArray('.outer');
    innerWrappers = gsap.utils.toArray('.inner');
    splitHeadings = gsap.utils.toArray('h2');
    images = gsap.utils.toArray('.bg');

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gotoSection(0, 1);

  }, []);


  return (
    <div className="App">
      <section className="hero first" >
        <div className='outer' >
          <div className='inner' >
            <div className='bg' >
              <div id='clg'><img
                src={clg}
                alt="University Campus"
              /></div>
              <h1 >Welcome to UniVerse University</h1><br />
              <p>Discover your future with us! Join a community of innovators,<br /><br />
                thinkers, and leaders at UniVerse University..</p>


              <div class="scroll-button" onClick={() => {
                console.log(window.innerHeight);
                window.scrollBy({
                  top: window.innerHeight, // Scroll down by the height of one viewport
                  left: 0,
                  behavior: 'smooth', // Smooth scrolling effect
                });

              }}>
                <div class="mouse-icon" >
                  <div class="scroll-wheel"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about second" >
        <div className='outer' >
          <div className='inner' >
            <div className='bg' >
              <div className="courseContainer">
                <h2 className="box1" >Our Courses</h2>
                <p className="box2" ref={box2}> ... Course 1    ....</p>
                <p className="box3" ref={box3}> ... Course 2    ....</p>
                <p className="box4" ref={box4}>... Course 3    ....</p>
                <p className="box5" ref={box5}>... Course 4    ....</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="courses third" ref={coursesRef} >
        <div className='outer' >
          <div className='inner' >
            <div className='bg' >
              <h2 >  Our Staff</h2>
              <Teachers />
            </div>
          </div>
        </div>
      </section>

      <section className="admissions fourth" >
        <div className='outer' >
          <div className='inner' >
            <div className='bg' >
              <h2 >Admissions Open!</h2><br />
              <div id='p1'><p>Shape your future with our world-class</p></div><div id='p2'> <p> programs and expert faculty.</p></div>
              <Lottie
        animationData={registration}
        loop
        style={{ width: 250, height: 250, position:'absolute', marginLeft:'-45%'}}
      />
              <button className="apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="contact fifth" >
        <div className='outer' >
          <div className='inner' >
            <div className='bg' >
              <h2>contact Us</h2>
            <Lottie
        animationData={contact}
        loop
        style={{ width: 280, height: 700, position:'absolute' , marginLeft: '-39%',     marginTop: '15%' }}
      />
              <form className="contact-form">
                <div className="form-group">
                  <label id='one'>Name</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label id='two'>Email</label>
                  <input type="email" required />
                </div>

                <div className="form-group">
                  <label id='three'>Message</label>
                  <textarea rows="5" required></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
