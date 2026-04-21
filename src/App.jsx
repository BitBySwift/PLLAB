import { useEffect, useRef, useState } from 'react'
import './App.css'

const heroLines = [
  'We shape your career',
  'We share your career journey',
  'Are you looking for a job? Here we are for you',
  'We teach skills, not degrees',
  'Your background doesn’t matter',
  'We prepare you for real-world jobs',
]

const coursePlans = [
  {
    name: 'Essential Pack',
    accent: 'green',
    originalPrice: '₹699',
    discountPrice: '₹219',
    timerHours: 48,
    includes: [
      'Resume Building',
      'Resume Review by Experts',
      'Mock Interviews + Guidance',
      'Interview Skill Rating',
      'Learning Playlists',
      'Project Building + Review',
      'Git & GitHub Basics',
      'Job Links via Company References',
      'Certificate',
    ],
  },
  {
    name: 'Pro Pack',
    accent: 'blue',
    originalPrice: '₹999',
    discountPrice: '₹699',
    timerHours: 51,
    includes: [
      'Portfolio Building',
      'Advanced Projects',
      'ATS Resume Optimization',
      'LinkedIn Optimization',
      'Guided Projects + Reviews',
      'LeetCode + System Design + DSA',
      'Job Links via WhatsApp',
      'Certificate',
    ],
  },
  {
    name: 'Advanced Pack',
    accent: 'purple',
    originalPrice: '₹6000',
    discountPrice: '₹999',
    includes: [
      'Advanced DSA + Problem Solving',
      'System Design + CodeChef/LeetCode',
      'One Tech Stack Specialization',
      'Communication Skills',
      'Portfolio, Resume & Mock Interviews',
      'Advanced Projects + Job Links',
      'Certificate',
    ],
  },
  {
    name: 'Job Guaranteed Program',
    accent: 'red',
    originalPrice: '₹36,999',
    discountPrice: '₹9,999',
    timerHours: 82,
    note: 'Pay remaining after placement. Refund if salary < 12 LPA. Terms apply.',
    includes: [
      '6 Month Program',
      'Tech Stack Choice (Full Stack, Backend, iOS, Flutter, AI/ML...)',
      'DSA Basic to Advanced + Problem Solving',
      'System Design + AI Development + Real Projects',
      'Resume + LinkedIn + Mock Interviews',
      'Communication + Job Platform Optimization',
      'Direct Job Links via WhatsApp',
    ],
  },
]

const techStacks = [
  'Full Stack',
  'Backend',
  'iOS (Swift)',
  'Flutter',
  'AI/ML',
  'Ethical Hacking',
  'Data Science / Analyst',
]

function CountdownTimer({ hours }) {
  const endTimeRef = useRef(0)
  const [remaining, setRemaining] = useState(hours * 60 * 60 * 1000)

  useEffect(() => {
    endTimeRef.current = Date.now() + hours * 60 * 60 * 1000

    const timer = setInterval(() => {
      setRemaining(Math.max(0, endTimeRef.current - Date.now()))
    }, 1000)

    return () => clearInterval(timer)
  }, [hours])

  const totalSeconds = Math.floor(remaining / 1000)
  const displayHours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const displayMinutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const displaySeconds = String(totalSeconds % 60).padStart(2, '0')

  return (
    <p className="timer" aria-live="polite">
      Limited offer ends in {displayHours}:{displayMinutes}:{displaySeconds}
    </p>
  )
}

function CourseCard({ plan }) {
  return (
    <article className={`course-card ${plan.accent}`}>
      <h3>{plan.name}</h3>
      <p className="price-line">
        <span className="strike">{plan.originalPrice}</span>
        <strong>{plan.discountPrice}</strong>
        <span className="offer-tag">Limited Time Offer 🔥</span>
      </p>
      {plan.timerHours ? <CountdownTimer hours={plan.timerHours} /> : <p className="timer">Premium curriculum access</p>}
      <ul>
        {plan.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {plan.note ? <p className="note">{plan.note}</p> : null}
      <button type="button">Buy Now</button>
    </article>
  )
}

function App() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const rotation = setInterval(() => {
      setLineIndex((previous) => (previous + 1) % heroLines.length)
    }, 2600)

    return () => clearInterval(rotation)
  }, [])

  return (
    <div className="app">
      <header className="top-nav">
        <div className="brand">Placement Lab</div>
        <nav aria-label="Main navigation">
          <a href="#courses">Courses</a>
          <a href="#enrolled">Enrolled Courses</a>
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
          <a href="#stories">Success Stories</a>
        </nav>
        <button type="button">Login / Signup</button>
      </header>

      <main>
        <section className="hero-section" id="about">
          <p className="eyebrow">Skills over degree • Real-world training • Job readiness</p>
          <h1>{heroLines[lineIndex]}</h1>
          <p>
            We help college students, pass-out students, and job seekers become industry ready through guided learning and placement support.
          </p>
          <div className="auth-box" aria-label="mobile-authentication">
            <label htmlFor="mobile">Login with mobile number</label>
            <div>
              <input id="mobile" type="tel" placeholder="Enter mobile number" />
              <button type="button">Get OTP</button>
            </div>
          </div>
        </section>

        <section className="trust" id="stories">
          <h2>Trusted by learners and hiring partners</h2>
          <p>We are tied up with multiple tech companies to guide learners toward real opportunities.</p>
          <div className="logos" aria-label="company-logos">
            <span>TechNova</span>
            <span>BuildStack</span>
            <span>CloudMint</span>
            <span>DevBridge</span>
            <span>ByteWorks</span>
          </div>
        </section>

        <section className="courses" id="courses">
          <h2>Course Plans</h2>
          <div className="course-grid">
            {coursePlans.map((plan) => (
              <CourseCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="details" id="enrolled">
          <h2>Course Detail Pages</h2>
          <p>Each course includes curriculum, stack breakdown, tools, project details, duration, and outcomes.</p>
          <ul>
            <li>Full Stack: HTML, CSS, JavaScript, React, Node, MongoDB</li>
            <li>iOS: Swift, SwiftUI, API Integration</li>
            <li>Career prep: Resume, mock interviews, communication, and project reviews</li>
          </ul>
        </section>

        <section className="payment">
          <h2>Payment Flow</h2>
          <ol>
            <li>Select course</li>
            <li>Click Buy Now</li>
            <li>Complete payment</li>
            <li>Access appears in dashboard</li>
          </ol>
          <p>Email automation after purchase: “Welcome to Placement Lab 🎉” with dashboard access guidance.</p>
        </section>

        <section className="program" id="contact">
          <h2>Job Guaranteed Program Tracks</h2>
          <div className="track-list">
            {techStacks.map((stack) => (
              <span key={stack}>{stack}</span>
            ))}
          </div>
          <p className="tagline">“We don’t just teach, we place.”</p>
        </section>
      </main>
    </div>
  )
}

export default App
