import './App.css'
import Scene from './Scene'

function App() {
  return (
    <>
      <header className="hero">

        <Scene />

        <nav className="nav">
          <a className="nav-brand" href="#">
            <span>$</span> whoami
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">

        </div>

      </header>


      <main>

        {/* ---------- About ---------- */}

        <section id="about" className="content-section">

          <div className="section-inner">

            <div className="section-heading">
              <p className="section-number">// 01 ABOUT</p>
              <h2>About me.</h2>
            </div>

            <div className="split-layout">

              <div className="about-text">

                <p>
                  I’m Jack, and I’m currently studying Cyber Security while working
                  toward a career in DevSecOps. I originally went into trade work
                  because I thought getting into tech meant going to university, and
                  since I’d left school to work, I assumed that path was basically
                  closed to me. Once I found out that wasn’t the case, I decided to
                  finally pursue something I’d been interested in my whole life.
                </p>

                <p>
                  I’ve always loved computers, gaming and technology, but the part I
                  enjoy most now is actually building things. I really like the
                  development side, especially backend work, automation and working
                  with data, but I also enjoy the security side just as much. Being
                  able to build something, break it, figure out why it broke, and
                  then make it better is probably the part I enjoy most.
                </p>

                <p>
                  I learn best by doing. I’d much rather build something and figure
                  things out as I go than sit through hours of theory and try to
                  remember it later. Once I get interested in something, I tend to go
                  all in on it, whether that means watching videos, reading about it,
                  testing things myself or building a project around it. That’s a big
                  part of why DevSecOps appeals to me: it brings together development,
                  security, automation and systems in a way that fits how I like to
                  learn and work.
                </p>

              </div>


              <div className="about-visual">

                <div className="terminal">

                  <div className="terminal-header">

                    <div className="terminal-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <p>~/profile</p>

                  </div>


                  <div className="terminal-body">

                    <p className="terminal-command">$ whoami</p>
                    <p className="terminal-output">Jack Hancock</p>

                    <p className="terminal-command">$ current_goal</p>
                    <p className="terminal-output">DevSecOps</p>

                    <p className="terminal-command">$ learning_style</p>
                    <p className="terminal-output">
                      Build it. Break it. Fix it.
                    </p>

                    <p className="terminal-command">$ current_bug</p>
                    <p className="terminal-output">
                      unknown, but definitely exists
                    </p>

                    <p className="terminal-command terminal-cursor">$</p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ---------- Projects ---------- */}

        <section id="projects" className="content-section">

          <div className="section-inner">

            <div className="section-heading">
              <p className="section-number">// 02 PROJECTS</p>
              <h2>Things I've built.</h2>
            </div>


            <div className="project-grid">

              {/* Project 01 */}

              <article className="project-card">

                <div className="project-main">

                  <p className="project-number">
                    PROJECT 01
                  </p>

                  <h3>
                    Jack's Candlestick Run
                  </h3>

                  <p className="project-description">
                    A browser runner game with a Flask backend,
                    SQLite database, Docker, testing and CI/CD.
                  </p>

                  <a
                    className="project-link"
                    href="https://github.com/jackd3v/jacks-candlestick-run"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub ↗
                  </a>

                </div>


                <div className="project-details">

                  <div className="project-detail">
                    <span>Frontend</span>
                    <p>JavaScript</p>
                  </div>

                  <div className="project-detail">
                    <span>Backend</span>
                    <p>Flask</p>
                  </div>

                  <div className="project-detail">
                    <span>Database</span>
                    <p>SQLite</p>
                  </div>

                  <div className="project-detail">
                    <span>Container</span>
                    <p>Docker</p>
                  </div>

                </div>

              </article>


              {/* Project 02 */}

              <article className="project-card">

                <div className="project-main">

                  <p className="project-number">
                    PROJECT 02
                  </p>

                  <h3>
                    Jack Hancock's Portfolio
                  </h3>

                  <p className="project-description">
                    Building my portfolio to present my projects and showcase my work.
                  </p>

                  <a
                    className="project-link"
                    href="https://github.com/jackd3v/Jack-Hancock-Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub ↗
                  </a>

                </div>


                <div className="project-details">

                  <div className="project-detail">
                    <span>Frontend</span>
                    <p>HTML</p>
                  </div>

                  <div className="project-detail">
                    <span>Frontend</span>
                    <p>CSS</p>
                  </div>

                </div>

              </article>

            </div>

          </div>

        </section>


        {/* ---------- Journey ---------- */}

        <section id="journey" className="content-section">

          <div className="section-inner">

            <div className="section-heading">
              <p className="section-number">// 03 JOURNEY</p>
              <h2>How I got here.</h2>
            </div>


            <div className="timeline">

              <div className="timeline-item">

                <span className="timeline-date">
                  Before IT
                </span>

                <h3>Plumbing</h3>

                <p>
                  I started out working in a trade, but knew it wasn't
                  where I wanted to stay long term.
                </p>

              </div>


              <div className="timeline-item">

                <span className="timeline-date">
                  2026
                </span>

                <h3>Cyber Security Cert IV</h3>

                <p>
                  I decided to chase something I actually enjoyed and
                  started studying cyber security and got really
                  interested in coding and development.
                </p>

              </div>


              <div className="timeline-item">

                <span className="timeline-date">
                  Now
                </span>

                <h3>Learning DevSecOps</h3>

                <p>
                  I'm building projects around development, security,
                  containers, cloud and automation.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ---------- Contact ---------- */}

        <section id="contact" className="content-section">

          <div className="section-inner">

            <div className="section-heading">
              <p className="section-number">// 04 CONTACT ME</p>
              <h2>Contact me.</h2>
            </div>


            <div className="split-layout">

              <div className="about-text">

                <p>
                  GitHub:{' '}
                  <a
                    className="project-link"
                    href="https://github.com/jackd3v"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    jackd3v ↗
                  </a>
                </p>

                <p>
                  LinkedIn:{' '}
                  <a
                    className="project-link"
                    href="https://www.linkedin.com/in/jack-hancock-1a3565430/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jack Hancock ↗
                  </a>
                </p>

                <p>
                  Email:{' '}
                  <a
                    className="project-link"
                    href="mailto:hello@jackhancock.dev"
                  >
                    hello@jackhancock.dev ↗
                  </a>
                </p>

              </div>


              <div className="about-visual">

                <div className="terminal">

                  <div className="terminal-header">

                    <div className="terminal-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <p>~/profile</p>

                  </div>


                  <div className="terminal-body">

                    <p className="terminal-command">$ email</p>
                    <p className="terminal-output">
                      hello@jackhancock.dev
                    </p>

                    <p className="terminal-command">$ jobStatus</p>
                    <p className="terminal-output">
                      Looking for work :)
                    </p>

                    <p className="terminal-command">$ sleep</p>
                    <p className="terminal-output">
                      command not found
                    </p>

                    <p className="terminal-command terminal-cursor">$</p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  )
}

export default App