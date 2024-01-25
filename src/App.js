import { useEffect, useState } from 'react';
import './app.scss';

function App() {
  const [dark, setDark] = useState(false);
  const [en, setEn] = useState(true)
  const [overlay, setOverlay] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (storedDarkMode !== null) {
      if (storedDarkMode === true) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
      setDark(storedDarkMode)
    }
  }, []); //chạy 1 lần 

  //chuyển ngôn ngữ
  const handleLangue = () => {
    setEn(!en);
  };
  //chuyển mode
  const handleDarkMode = () => {
    setDark(!dark);
    localStorage.setItem('darkMode', JSON.stringify(!dark));
    document.body.classList.toggle('dark')
  };

  const handleEdit = () => {
    setOverlay(!overlay)
    const formLogin = document.getElementById('formLogin').classList.toggle('trans0')
    window.scrollTo(0, 0);
  }


  return (
    <>
      {
        en ? (

          <div id="app">
            <header>
              <div className="content">
                <h3>My CV <i className="fa-regular fa-pen-to-square"
                  onClick={handleEdit}
                ></i></h3>
                <div>
                  {
                    en ? (<button type='button' onClick={handleLangue}>VN</button>) : (<button type='button' onClick={handleLangue}>EN</button>)
                  }
                  {dark ? (

                    <button type='button' onClick={handleDarkMode}>
                      <i className="fa-regular fa-sun"></i>
                    </button>
                  ) : (
                    <button type='button' onClick={handleDarkMode}>
                      <i className="fa-regular fa-moon"></i>
                    </button>
                  )}
                </div>
              </div>
            </header>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-address-card"></i> Information
                </h2>
              </div>
              <div className="info">
                <div className="photo">
                  <img src="img/photo.png" alt="3x4" />
                </div>
                <div className='text'>
                  <div className="textFlex">
                    {/* <p>Full name:</p> <h4>Truong Buu Nhut</h4> */}
                    <p className='info'><i className="fa-solid fa-user"></i></p> <h4>Truong Buu Nhut</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Birthday:</p> <h4>24/08/1986</h4> */}
                    <p className='info'><i className="fa-regular fa-calendar-days"></i></p> <h4>24/08/1986</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Address:</p> <h4>Binh Tan District, Ho Chi Minh City, VietNam</h4> */}
                    <p className='info'><i className="fa-solid fa-location-dot"></i></p> <h4>Binh Tan District, Ho Chi Minh City, VietNam</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Phone:</p> <h4>(+84) 909 240 886</h4> */}
                    <p className='info'><i className="fa-solid fa-phone"></i></p> <h4><a href="tel:+84909240886">(+84) 909 240 886</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Email:</p> <h4>nhut.nta@gmail.com</h4> */}
                    <p className='info'><i className="fa-solid fa-envelope"></i></p> <h4><a href="mailto:nhut.nta@gmail.com">nhut.nta@gmail.com</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Facebook:</p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4> */}
                    <p className='info'><i className="fa-brands fa-facebook"></i></p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Facebook:</p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4> */}
                    <p className='info'><i className="fa-solid fa-globe"></i></p> <h4><a href="http://www.nodejs.edu.vn">nodejs.edu.vn</a></h4>
                  </div>

                </div>
              </div>
              <h3>
                Web Developer
              </h3>

            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-circle-info"></i> Summary
                </h2>
              </div>
              <div className="info">
                <p>
                  I am a fesher full-stack web developer, full of enthusiasm and responsibility for my work. Eager to learn and absorb new knowledge to improve my skills. My hard work and dedication will contribute positively to any project I am involved in.
                </p>

              </div>
            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-graduation-cap"></i> Certificate
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>01/03/2023</p> <h4>Learned and graduated Fontend course at CycberSoft.</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>01/09/2023</p> <h4>Learned and graduated Backend course at CycberSoft.</h4>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>


            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-gear"></i> Skills
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Fontend:</p> <h4>ReactJS, JavaScript, HTML-5, CSS-3, SCSS, ...</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Backend:</p> <h4>NodeJS, NestJS, ExpressJS, MySQL, Docker, VPS, Hosting, Domain,  ...</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Framework:</p> <h4>Axios, Redux, Prisma, Sequelize, ...</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Lirbary:</p> <h4>Ant-design, Tailwind, BootStrap, ...</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>English:</p> <h4>Conversation, read and understand technical doccument.</h4>
                      </div>
                    </div>
                  </div>

                </li>
                {/* <li>
              <div className="skills">
                <div className="text">
                  <div className="textFlex">
                    <p>Support</p> <h4>Chat GPT.</h4>
                  </div>
                </div>
              </div>

            </li> */}
              </ul>

            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-file"></i> Real-Project
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Shop-online:</p> <h4><a href="http://bachhoahanhan.com">http://bachhoahanhan.com</a></h4>
                      </div>
                    </div>
                  </div>

                </li>
                {/* <li>
              <div className="skills">
                <div className="text">
                  <div className="textFlex">
                    <p>shop-online</p> <h4><a href="http://congtythuanphat.com/dangnhap">http://congthuanphat.com</a></h4>
                  </div>
                </div>
              </div>

            </li> */}
              </ul>


            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-face-smile"></i> My Expectation
                </h2>
              </div>
              <div className="info">
                <p>
                  I am looking for this intern position in order to improve my web development skills. Thank you very much for checking out my CV, I hope to receive your results as soon as possible.
                </p>

              </div>
            </main>
            <footer>
              <span>
                truongbuunhut's cv - 2024
              </span>
            </footer>
          </div>
        ) : (
          <div id="app">
            <header>
              <div className="content">
                <h3>Hồ Sơ Của Tôi <i className="fa-regular fa-pen-to-square"
                  onClick={handleEdit}
                ></i></h3>
                <div>
                  {
                    en ? (<button type='button' onClick={handleLangue}>VN</button>) : (<button type='button' onClick={handleLangue}>EN</button>)
                  }
                  {dark ? (

                    <button type='button' onClick={handleDarkMode}>
                      <i className="fa-regular fa-sun"></i>
                    </button>
                  ) : (
                    <button type='button' onClick={handleDarkMode}>
                      <i className="fa-regular fa-moon"></i>
                    </button>
                  )}
                </div>
              </div>
            </header>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-address-card"></i> Thông Tin Cá Nhân
                </h2>
              </div>
              <div className="info">
                <div className="photo">
                  <img src="img/photo.png" alt="3x4" />
                </div>
                <div className='text'>
                  <div className="textFlex">
                    {/* <p>Full name:</p> <h4>Truong Buu Nhut</h4> */}
                    <p className='info'><i className="fa-solid fa-user"></i></p> <h4>Trương Bửu Nhựt</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Birthday:</p> <h4>24/08/1986</h4> */}
                    <p className='info'><i className="fa-regular fa-calendar-days"></i></p> <h4>24/08/1986</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Address:</p> <h4>Binh Tan District, Ho Chi Minh City, VietNam</h4> */}
                    <p className='info'><i className="fa-solid fa-location-dot"></i></p> <h4>Quận Bình Tân, Thành Phố Hồ Chí Minh, Việt Nam</h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Phone:</p> <h4>(+84) 909 240 886</h4> */}
                    <p className='info'><i className="fa-solid fa-phone"></i></p> <h4><a href="tel:+84909240886">(+84) 909 240 886</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Email:</p> <h4>nhut.nta@gmail.com</h4> */}
                    <p className='info'><i className="fa-solid fa-envelope"></i></p> <h4><a href="mailto:nhut.nta@gmail.com">nhut.nta@gmail.com</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Facebook:</p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4> */}
                    <p className='info'><i class="fa-brands fa-facebook"></i></p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4>
                  </div>
                  <div className="textFlex">
                    {/* <p>Facebook:</p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4> */}
                    <p className='info'><i className="fa-solid fa-globe"></i></p> <h4><a href="http://www.nodejs.edu.vn">nodejs.edu.vn</a></h4>
                  </div>


                </div>
              </div>
              <h3>
                Lập Trình Viên Web
              </h3>

            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-circle-info"></i> Giới Thiệu
                </h2>
              </div>
              <div className="info">
                <p>
                  Tôi là một lập trình viên mới, đầy nhiệt huyết và trách nhiệm với công việc. Ham học hỏi tiếp thu những kiến thức mới để nâng cao kỹ năng của bản thân. Sự chăm chỉ và tận tâm của tôi sẽ đóng góp tích cực vào bất kỳ dự án nào tôi tham gia.
                </p>

              </div>
            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-graduation-cap"></i> Chứng Chỉ
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>01/03/2023</p> <h4>Học và tốt nghiệp khoá Fontend tại CycberSoft.</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>01/09/2023</p> <h4>Học và tốt nghiệp khoá Backend tại CycberSoft.</h4>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>


            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-gear"></i> Kỹ Năng
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Fontend:</p> <h4>ReactJS, JavaScript, HTML-5, CSS-3, SCSS, ...,</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Backend:</p> <h4>NodeJS, NestJS, ExpressJS, MySQL, Docker, VPS, Hosting, Domain, ...,</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Framework:</p> <h4>Axios, Redux, Prisma, Sequelize, ...,</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Lirbary:</p> <h4>Ant-design, Tailwind, BootStrap, ...,</h4>
                      </div>
                    </div>
                  </div>

                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>English:</p> <h4>Tiếng Anh giao tiếp cơ bản, đọc hiểu tài liệu kỹ thuật.</h4>
                      </div>
                    </div>
                  </div>

                </li>
                {/* <li>
              <div className="skills">
                <div className="text">
                  <div className="textFlex">
                    <p>Support</p> <h4>Chat GPT.</h4>
                  </div>
                </div>
              </div>

            </li> */}
              </ul>






            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-file"></i> Dự Án Thực Tế
                </h2>
              </div>
              <ul>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Web bán hàng:</p> <h4><a href="http://bachhoahanhan.com">http://bachhoahanhan.com</a></h4>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>

              {/* <div className="skills">
          <div className="text">
            <div className="textFlex">
              <p>shop-online</p> <h4><a href="http://congtythuanphat.com/dangnhap">http://congthuanphat.com</a></h4>
            </div>
          </div>
        </div> */}
            </main>
            <main>
              <div className="title">
                <h2>
                  <i className="fa-solid fa-face-smile"></i> Mong Muốn
                </h2>
              </div>
              <div className="info">
                <p>
                  Tôi đang tìm việc thực tập để cải thiện kỹ năng. Cảm ơn bạn đã xem hồ sơ của tôi. Hy vọng sớm nhận được phản hồi của bạn. Cảm ơn!
                </p>

              </div>
            </main>
            <footer>
              <span>
                truongbuunhut's cv - 2024
              </span>
            </footer>
          </div>
        )
      }
      <div className={overlay ? 'overlay' : ''} onClick={handleEdit}>


      </div>
      <div id='formLogin'>
        <form action="">
          {/* <h3>Xác nhận chính chủ</h3> */}
          <div className="inputItem">
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder='Username' />
          </div>
          <div className="inputItem">
            <i className="fa-solid fa-key"></i>
            <input type={showPass ? 'text' : 'password'} placeholder='Password' />
            <i className={showPass ? "fa-solid fa-eye-slash key" : "fa-solid fa-eye key"} onClick={() => setShowPass(!showPass)}></i>
          </div>
          <button type='button'>Login</button>
        </form>
      </div>

    </>
  );
}

export default App;
