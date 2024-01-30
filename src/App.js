import { useEffect, useState } from 'react';
import './app.scss';
import { QRCode, Space, Image } from 'antd';
// import * as moment from 'moment'
import moment from 'moment-timezone';
import axios from 'axios'


function App() {
  const [dark, setDark] = useState(false);
  const [en, setEn] = useState(true)
  const [overlay, setOverlay] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [luotTruyCap, setLuotTruyCap] = useState(1)
  const [showBackToTop, setShowBackToTop] = useState(false);
  const yourTimeZone = 'Asia/Ho_Chi_Minh';
  const date = new Date()
  // console.log(moment(date).format('DD/MM/YYYY hh:mm'))

  const currentURL = window.location.href;
  const url = new URL(currentURL);
  // console.log(url.hostname)

  // console.log(showBackToTop)

  const handleScroll = () => {
    if (window.scrollY >= 60) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };


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
    //lượt truy cập
    axios({
      url: 'https://api.bachhoahanhan.com/users/dem-luot-truy-cap',
      method: 'post',
      data: {
        ngay: date,
        soLuong: 1,
        diaChi: url.hostname,
      }

    }).then((res) => {
      setLuotTruyCap(res.data.content)
    })


    // Lắng nghe sự kiện cuộn để cập nhật trạng thái hiển thị nút
    window.addEventListener('scroll', handleScroll);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };



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

  //edit
  const handleEdit = () => {
    setOverlay(!overlay)
    const formLogin = document.getElementById('formLogin').classList.toggle('trans0')
    window.scrollTo(0, 0);
  }

  //in
  const handlePrint = () => {
    window.print()

  }



  //zalo chat
  const phoneNumber = '0909240886'; // Thay thế bằng số điện thoại của bạn
  const openZaloChat = () => {
    window.open(`https://zalo.me/${phoneNumber}`, '_blank');
  };

  //back to top
  const handleBackToTop = () => {
    // Cuộn lên đầu trang khi nút được click
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {
        en ? (
          <div id="app">
            <header>
              <div className="content">
                <div>
                  <h3><i className="fa-solid fa-pen-to-square"
                    onClick={handleEdit}
                  ></i></h3>
                  <h3>
                    <i className="fa-solid fa-print"
                      onClick={handlePrint}
                    ></i>
                  </h3>
                  <div className="flip-container">
                    <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          My CV
                        </div>
                        <div className="flip-card-back">
                          My CV
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    en ? (
                      <button onClick={handleLangue}>VN</button>
                    ) : (
                      <button onClick={handleLangue}>EN</button>
                    )
                  }
                  {dark ? (
                    <button onClick={handleDarkMode}>
                      <i className="fa-regular fa-sun"></i>
                    </button>
                  ) : (
                    <button onClick={handleDarkMode}>
                      <i className="fa-regular fa-moon"></i>
                    </button>
                  )
                  }
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
                  {/* qr code */}
                  <Space className='qrCode'>
                    <QRCode value={'http://nodejs.edu.vn'} status='active' />
                  </Space>
                </div>
                <div className='text'>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-user"></i></p> <h4>Truong Buu Nhut</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-regular fa-calendar-days"></i></p> <h4>24/08/1986</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-location-dot"></i></p> <h4>Binh Tan District, Ho Chi Minh City, VietNam</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-phone"></i></p> <h4><a href="tel:+84909240886">(+84) 909 240 886</a></h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-envelope"></i></p> <h4><a href="mailto:nhut.nta@gmail.com">nhut.nta@gmail.com</a></h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-brands fa-facebook"></i></p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4>
                  </div>
                  <div className="textFlex">
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
                        <p>Fontend:</p> <h4>ReactJS, JavaScript, HTML-5, CSS-3, SCSS, Responsive,...</h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Backend:</p> <h4>NodeJS, NestJS, ExpressJS, RESTful API, Swagger, MySQL, Docker, VPS, Hosting, Domain,...</h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Libraries:</p> <h4>Ant-design, Tailwind, BootStrap, Axios, Redux, Prisma, Sequelize,...</h4>
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
                        <h4>
                          <b>1/ My CV</b> <i>(Personal use).</i><br />
                          <b>User interface:</b> <br />
                          + Show infomation, dark theme, light theme, English, Vietnamese, Print CV. <br></br>
                          + Responsive web, amination css. Only code fontend. <br />
                          Link: <a href="https://nodejs.edu.vn" className='link'>https://nodejs.edu.vn</a>

                        </h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <h4>
                          <b>2/ Online, offline Sales website</b> <i>(Code by customer requirements).</i> <br />
                          <b>User interface:</b> <br />
                          + Sign in, log in, log out, order. <br></br>
                          + Search products. <br></br>
                          + Add to cart, increase or decrease quantity, delete from cart. <br></br>
                          + Confirm orders, cancel orders, track status. <br></br>
                          + Accumulated amount, paid by accumulated wallet. <br></br>
                          <b>Admin interface:</b> <br />
                          + Create products <i>(add, edit, delete, manage: import price, selling price, discount, unit, inventory, order limit,...).</i> <br></br>
                          + Online orders management: process orders, change status, select delivery staff, automatically subtract or add inventory,... <br></br>
                          + Offline sales management: importing goods, exporting goods, payment suggestions, adding and subtracting inventory,... <br></br>
                          + Debt management: revenue reporting by date, customer, product,... <br></br>
                          + Parnerts management: manage suppliers, customers, and employees. <br></br>
                          + Configuration: temporary off, shipping fee, customer refund percentage,... <br />
                          + Code both fontend and backend alone by my-self. <br></br>
                          + <i>(Pushed srouce to github, bought domain name and rented one VPS. Deployed on VPS and given to customers for use).</i> <br />
                          Link: <a href="https://bachhoahanhan.com" className='link'>https://bachhoahanhan.com</a> <br />

                        </h4>
                      </div>
                    </div>
                  </div>
                </li>
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
                  I am looking for this intern position in order to improve my web development skills. Thank you very much for checking out my CV. I hope to receive your results as soon as possible.
                </p>
              </div>
            </main>
            <footer>
              <span>
                truongbuunhut's cv - {moment().tz(yourTimeZone).format('YYYY')} <br />
                <b className='luotTruyCap'>Access: {luotTruyCap.toLocaleString()}</b>
              </span>
            </footer>
          </div>
        ) : (
          <div id="app">
            <header>
              <div className="content">
                <div>
                  <h3><i className="fa-solid fa-pen-to-square"
                    onClick={handleEdit}
                  ></i></h3>
                  <h3>
                    <i className="fa-solid fa-print"
                      onClick={handlePrint}
                    ></i>
                  </h3>
                  <div className="flip-container">
                    <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className="flip-card-front">
                          Hồ Sơ
                        </div>
                        <div className="flip-card-back">
                          Hồ Sơ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    en ? (
                      <button onClick={handleLangue}>VN</button>
                    ) : (
                      <button onClick={handleLangue}>EN</button>
                    )
                  }
                  {dark ? (
                    <button onClick={handleDarkMode}>
                      <i className="fa-regular fa-sun"></i>
                    </button>
                  ) : (
                    <button onClick={handleDarkMode}>
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
                  {/* qr code */}
                  <Space className='qrCode'>
                    <QRCode value={'http://nodejs.edu.vn'} />
                  </Space>
                </div>
                <div className='text'>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-user"></i></p> <h4>Trương Bửu Nhựt</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-regular fa-calendar-days"></i></p> <h4>24/08/1986</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-location-dot"></i></p> <h4>Quận Bình Tân, Thành Phố Hồ Chí Minh, Việt Nam</h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-phone"></i></p> <h4><a href="tel:+84909240886">(+84) 909 240 886</a></h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-solid fa-envelope"></i></p> <h4><a href="mailto:nhut.nta@gmail.com">nhut.nta@gmail.com</a></h4>
                  </div>
                  <div className="textFlex">
                    <p className='info'><i className="fa-brands fa-facebook"></i></p> <h4><a href="https://facebook.com/buunhut">facebook.com/buunhut</a></h4>
                  </div>
                  <div className="textFlex">
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
                        <p>Fontend:</p> <h4>ReactJS, JavaScript, HTML-5, CSS-3, SCSS, Responsive,...</h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Backend:</p> <h4>NodeJS, NestJS, ExpressJS, RESTful API, Swagger, MySQL, Docker, VPS, Hosting, Domain,...</h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Libraries:</p> <h4>Ant-design, Tailwind, BootStrap, Axios, Redux, Prisma, Sequelize,...</h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <p>Tiếng Anh:</p> <h4>Giao tiếp cơ bản, đọc hiểu tài liệu kỹ thuật.</h4>
                      </div>
                    </div>
                  </div>
                </li>
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
                        <h4>
                          <b>1/ My CV</b> <i>(Cá nhân).</i> <br />
                          <b>Giao diện người dùng:</b> <br />
                          + Hiển thị thông tin hồ sơ, chuyển giao diện tối, giao diện sáng, chuyển đổi ngôn ngữ tiếng Anh, tiếng Việt, chức năng in hồ sơ. <br></br>
                          + Responsive web, hiệu ứng css. Chỉ viết fontend. <br />
                          Link: <a href="https://nodejs.edu.vn" className='link'>https://nodejs.edu.vn</a>

                        </h4>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="skills">
                    <div className="text">
                      <div className="textFlex">
                        <h4>
                          <b>2/ Web bán hàng online, offline</b> <i>(Viết theo yêu cầu của khách hàng).</i> <br />
                          <b>Giao diện người dùng:</b> <br />
                          + Đăng ký tài khoản, đăng nhập, đăng xuất, đặt hàng. <br></br>
                          + Tìm kiếm sản phẩm. <br></br>
                          + Thêm sản phẩm vào giỏ hàng, tăng giảm số lượng, xoá khỏi giỏ hàng. <br></br>
                          + Xác nhận đơn, huỷ đơn, theo dõi trạng thái. <br></br>
                          + Số tiền tích luỹ, thanh toán bằng ví tích luỹ. <br></br>
                          <b>Giao diện quản lý:</b> <br />
                          + Tạo sản phẩm <i>(thêm, sửa, xoá, quản lý: giá nhập, giá bán, giá giảm, đơn vị tính, tồn kho, giới hạn đặt hàng,...).</i> <br></br>
                          + Quản lý đơn hàng online: xử lý đơn, chuyển trạng thái, chọn nhân viên giao hàng, tự động trừ kho hoặc cộng kho,... <br></br>
                          + Bán hàng offline: nhập hàng, xuất hàng, gợi ý thanh toán, cộng trừ kho,... <br></br>
                          + Quản lý công nợ, báo cáo danh thu theo ngày tháng, khách hàng, sản phẩm,... <br></br>
                          + Quản lý nhà cung cấp, khách hàng, nhân viên. <br></br>
                          + Cấu hình: tạm tắt shop, phí vận chuyển, phần trăm tiền hoàn cho khách,... <br />
                          + Một mình viết cả fontent và backend. <br></br>
                          + <i>(Đã đẩy src lên github, mua tên miền và thuê VPS. Triển khai trên VPS và đã bàn giao cho khách hàng sử dụng).</i> <br />
                          Link: <a href="https://bachhoahanhan.com" className='link'>https://bachhoahanhan.com</a>
                        </h4>
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
                truongbuunhut's cv - {moment().tz(yourTimeZone).format('YYYY')} <br />
                <b className='luotTruyCap'>Lượt truy cập: {luotTruyCap.toLocaleString()}</b>
              </span>
              {/* <p><i className="fa-regular fa-eye"></i> 19</p> */}
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
      <div className="backToTop" style={{ display: showBackToTop ? 'block' : 'none' }} onClick={handleBackToTop}>
        <button><i className="fa-solid fa-angles-up"></i></button>
      </div>
      <div className='zaloChat'
        onClick={openZaloChat}
      >
        <button>Zalo</button>
      </div>
    </>
  );
}
export default App;
