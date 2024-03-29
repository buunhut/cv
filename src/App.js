import './app.scss';
import { useEffect, useRef, useState } from 'react';
import { QRCode, Space, message, Tooltip } from 'antd';
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
  const currentURL = window.location.href;
  const url = new URL(currentURL);

  //dữ liệu list ngân hàng
  const [listNganHang, setListNganHang] = useState(
    [
      {
        maNganHang: 'acb',
        tenNganHang: 'acb'
      },
      {
        maNganHang: 'agribank',
        tenNganHang: 'agribank'
      },
      {
        maNganHang: 'bidv',
        tenNganHang: 'bidv'
      },
      {
        maNganHang: 'dongabank',
        tenNganHang: 'dongabank'
      },
      {
        maNganHang: 'eximbank',
        tenNganHang: 'eximbank'
      },
      {
        maNganHang: 'namabank',
        tenNganHang: 'namabank'
      },
      {
        maNganHang: 'vietcombank',
        tenNganHang: 'vietcombank'
      },
      {
        maNganHang: 'vietinbank',
        tenNganHang: 'vietinbank'
      },
      {
        maNganHang: 'sacombank',
        tenNganHang: 'sacombank'
      },
      {
        maNganHang: 'techcombank',
        tenNganHang: 'techcombank'
      },
    ]
  )

  //list bao lì xì 
  const [listBaoLiXi, setListBaoLiXi] = useState(
    [
      {
        loiChuc: 'Chúc mừng năm mới. Sức khoẻ dồi dào, tràn đầy năng lượng.',
        chuDe: 'Sức Khoẻ',
        buttonId: 'sucKhoe'
      },
      {
        loiChuc: 'Chúc mừng năm mới. Tiền vào như nước, vàng bạc đầy nhà.',
        chuDe: 'Tài Lộc',
        buttonId: 'taiLoc'
      },
      {
        loiChuc: 'Chúc mừng năm mới. Sự nghiệp thăng tiến, mọi việc hanh thông.',
        chuDe: 'Sự Nghiệp',
        buttonId: 'suNghiep',
      },
      {
        loiChuc: 'Chúc mừng năm mới. Hạnh phúc đong đầy, đường tình viên mãn.',
        chuDe: 'Tình Yêu',
        buttonId: 'tinhYeu'
      },
      {
        loiChuc: 'Chúc mừng năm mới. Vạn sự như ý, cả năm gặp toàn điều may.',
        chuDe: 'May Mắn',
        buttonId: 'mayMan'
      },
      {
        loiChuc: 'Chúc mừng năm mới. Tiếng cười ngập tràn, luôn luôn tươi trẻ.',
        chuDe: 'Niềm Vui',
        buttonId: 'niemVui'
      },
    ]
  )

  const handleScroll = () => {
    if (window.scrollY >= 60) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  //chạy 1 lần
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
    const setTimeRun = moment(date)

    //chạy thiệt

    // if (
    //   moment(setTimeRun, 'DD/MM/YYYY HH:mm') >= moment('09/02/2024 20:30', 'DD/MM/YYYY HH:mm') &&
    //   moment(setTimeRun, 'DD/MM/YYYY HH:mm') <= moment('09/02/2024 23:59', 'DD/MM/YYYY HH:mm')) {
    //   setMenhGia([
    //     100000, 200000, 500000, 100000, 200000, 100000, 200000, 500000,
    //     100000, 200000, 500000, 100000, 200000, 100000, 200000, 500000, 1000000,
    //     100000, 200000, 500000, 100000, 200000, 100000, 200000, 500000,
    //   ])
    // }

    //list người tham gia
    getListNguoiThamGia()

    // play nhạc
    // Add event listener for visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        // Pause the audio when the document is not visible
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Lắng nghe sự kiện cuộn để cập nhật trạng thái hiển thị nút
    window.addEventListener('scroll', handleScroll);
    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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
    // handleBackToTop()
    const formLogin = document.getElementById('formLogin').classList.toggle('trans0')
  }

  //in
  const handlePrint = () => {
    window.print()

  }

  //Viết hoa
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  //lock screen
  const [lockSroll, setLockSroll] = useState(false)
  const khoaScroll = () => {
    if (lockSroll) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setLockSroll(!lockSroll)
  }

  //code phần lì xì
  const [showLiXi, setShowLiXi] = useState(true)
  const [liXi, setLixi] = useState(0)
  const [lock, setLock] = useState(true)
  const [bao, setBao] = useState(0)

  const [menhGia, setMenhGia] = useState(
    [
      20000, 50000, 100000, 50000, 20000,
      20000, 50000, 100000, 50000, 20000,
      20000, 50000, 100000, 50000, 20000,
      20000, 50000, 100000, 50000, 20000,
      20000, 50000, 100000, 50000, 20000,
    ]
  )

  //show lì xì
  const handleShowLiXi = () => {
    handleBackToTop()
    const liXiElement = document.querySelector('.liXi');
    if (liXiElement) {
      liXiElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLixi(0)
    setLock(true)
    setShowLiXi(!showLiXi)
    message.destroy()
  }

  //xáo trộm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  //alert form
  const [alertForm, setAlertForm] = useState({
    hoVaTen: '',
    soDienThoai: '',
    soTaiKhoan: '',
    nganHang: '',
    loiChuc: ''
  })
  // console.log(alertForm)
  const [formDangKy, setFormDangKy] = useState({
    hoVaTen: '',
    soDienThoai: '',
    soTaiKhoan: '',
    nganHang: '',
    loiChuc: ''
  })

  const handleChangInput = (e) => {
    let { id, value } = e.target
    if (id === 'soDienThoai' || id === 'soTaiKhoan') {
      //chỉ lầy số, không được gõ ký tự abc
      setFormDangKy((prevState) => ({
        ...prevState,
        [id]: value.replace(/\D/g, '')
      }))
      // if (
      //   value === '0909240886' ||
      //   value === '0835252527' ||
      //   value === '0919317710' ||
      //   value === '0918369336' ||
      //   value === '0836369336' ||
      //   value === '0832366566' ||
      //   value === '0855990669' ||
      //   value === '0818369336'
      // ) {
      //   setMenhGia([100000, 200000, 500000])
      // } else if (value === '0939710395') {
      //   setMenhGia([500000, 1000000])
      // }
    } else {
      setFormDangKy((prevState) => ({
        ...prevState,
        [id]: value
      }))
    }
  }

  const onBlurInput = (e) => {
    const { id, value } = e.target
    if (value) {
      setAlertForm((prevState) => ({
        ...prevState,
        [id]: ''
      }))
      if (id === 'soTaiKhoan') {
        axios({
          method: 'post',
          url: 'https://api.bachhoahanhan.com/users/check-thong-tin',
          data: { thongTin: value }
        }).then((res) => {
          const { statusCode } = res.data
          if (statusCode === 209) {
            setAlertForm((prevState) => ({
              ...prevState,
              [id]: 'Đã đăng ký'
            }))
            if (id === 'hoVaTen') {
              message.warning(value.toUpperCase() + ' đã nhận lì xì rồi', 5)
            } else if (id === 'soTaiKhoan') {
              message.warning('Tài khoản ' + value + ' đã nhận lì xì rồi', 5)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    } else {
      setAlertForm((prevState) => ({
        ...prevState,
        [id]: 'Vui lòng nhập thông tin'
      }))
    }
  }

  const handleXacNhanThongTin = () => {
    let valid = true
    for (let key in formDangKy) {
      if (formDangKy[key] === '') {
        setAlertForm((prevState) => ({
          ...prevState,
          [key]: 'Vui lòng nhập thông tin'
        }))
        valid = false;
      } else {
        setAlertForm((prevState) => ({
          ...prevState,
          [key]: ''
        }))
      }
    }
    if (valid) {
      playAudio()
      const currentTime = new Date()
      const data = {
        ...formDangKy,
        ngay: currentTime,
        liXi: 0
      };
      axios({
        method: 'post',
        url: 'https://api.bachhoahanhan.com/users/dang-ky-nhan-li-xi',
        data
      }).then((res) => {
        const { statusCode, content } = res.data
        if (statusCode === 209) {
          message.warning(content.hoVaTen.toUpperCase() + ' đã nhận lì xì rồi', 5)
          setAlertForm((prevState) => ({
            ...prevState,
            hoVaTen: 'đã nhận lì xì rồi'
          }))

        } else if (statusCode === 208) {
          message.warning('Số tk ' + content.soTaiKhoan + ' đã nhận lì xì rồi', 5)
          setAlertForm((prevState) => ({
            ...prevState,
            soTaiKhoan: 'đã nhận lì xì rồi'
          }))

        } else if (statusCode === 200) {
          const { lxId } = res.data.content
          setLxId(lxId)
          setLock(false)
          message.success('Hãy chọn 1 bao lì xì bất kỳ', 0)

        } else {
          message.error('Có lỗi xảy ra', 5)
        }
      }).catch((err) => {
        console.log(err)
      })
      // handleBackToTop()
      // const liXiElement = document.querySelector('.liXi');
      // if (liXiElement) {
      //   liXiElement.scrollTo({ top: 0, behavior: 'smooth' });
      // }

    } else {
      message.error('Vui lòng nhập đầy đủ thông tin', 5)
    }

  }

  const [lxId, setLxId] = useState(0)
  const [ghiChu, setGhiChu] = useState('')
  const [hoVaTen, setHoVaTen] = useState('')

  const handleMoBao = (e) => {
    const { id } = e.target
    shuffleArray(menhGia)
    setLixi(menhGia[bao])
    setHoVaTen(formDangKy.hoVaTen)
    setLock(true)
    setGhiChu(id)

    let data = {
      lxId,
      liXi: menhGia[bao],
      ghiChu: id
    }
  }

  axios({
    method: 'post',
    url: 'https://api.bachhoahanhan.com/users/update-li-xi',
    data
  }).then((res) => {
    const { statusCode, content } = res.data
    if (statusCode === 200) {
      setFormDangKy({
        hoVaTen: '',
        soDienThoai: '',
        soTaiKhoan: '',
        nganHang: '',
        loiChuc: ''
      })
      message.destroy()
      getListNguoiThamGia()
    }
    // console.log(res.data.content)
  }).catch((err) => {
    console.log(err)
  })
  // handleBackToTop()
  // const liXiElement = document.querySelector('.liXi');
  // if (liXiElement) {
  //   liXiElement.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  khoaScroll()
  playAudio()

}

const [listNguoiThamGia, setListNguoiThamGia] = useState([])
let tongTien = 0

// console.log(listNguoiThamGia)
const getListNguoiThamGia = () => {
  axios({
    method: 'get',
    url: 'https://api.bachhoahanhan.com/users/get-list-nguoi-tham-gia',
  }).then((res) => {
    const { content } = res.data
    if (content.length > 0) {
      setListNguoiThamGia(content)
    }
  })

}

//countdown
const targetDate = moment('09/02/2024 20:30:00', 'DD/MM/YYYY HH:mm:ss');
// const targetDate = moment('06/02/2024 16:00:00', 'DD/MM/YYYY HH:mm:ss');
const calculateTimeRemaining = (targetDate) => {
  const now = moment();
  const diff = moment.duration(targetDate.diff(now));
  return {
    value: diff.asSeconds(),
    days: diff.days(),
    hours: diff.hours(),
    minutes: diff.minutes(),
    seconds: diff.seconds(),
  };
};

const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));
const [canClick, setCanClick] = useState(false);

// useEffect(() => {
//   const timer = setInterval(() => {
//     const remaining = calculateTimeRemaining(targetDate);
//     setTimeRemaining(remaining);
//     if (remaining.value <= 0) {
//       setCanClick(true);
//       clearInterval(timer);
//     }
//   }, 1000);

//   return () => clearInterval(timer);
// }, [targetDate]);

//handle xem lại 
const [xuLy, setXuLy] = useState(false)
const handlePreview = (item) => {
  // handleBackToTop()
  // const liXiElement = document.querySelector('.liXi');
  // if (liXiElement) {
  //   liXiElement.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  khoaScroll()
  setXuLy(item.xuLy)
  setLixi(item.liXi)
  setGhiChu(item.ghiChu)
  setHoVaTen(item.hoVaTen)
  playAudio()
}

const audioFile = [
  // './music/tet_binh_an.mp3',
  // './music/mua_xuan_oi.mp3',
  // './music/tet_binh_an_2.mp3',
  // './music/long_phung_sum_vay.mp3',
  './music/tet_1.mp3',
  './music/tet_2.mp3',
  './music/tet_3.mp3',
  './music/tet_4.mp3',
  './music/tet_5.mp3',
  './music/tet_6.mp3',
]

const randomIndex = () => Math.floor(Math.random() * audioFile.length);
const audioRef = useRef(null)
const playAudio = () => {
  const index = randomIndex()
  if (audioRef.current) {
    audioRef.current.src = audioFile[index];
    audioRef.current.play()
  }
}
//sort
const [sort, setSort] = useState(false)
const handleSort = () => {
  setSort(!sort)
  if (sort) {
    setListNguoiThamGia(listNguoiThamGia.sort((a, b) => a.liXi - b.liXi))

  } else {
    setListNguoiThamGia(listNguoiThamGia.sort((a, b) => b.liXi - a.liXi))

  }
}

console.log(menhGia)


return (
  <>
    <div>
      <audio ref={audioRef} loop ></audio>
    </div>
    {
      showLiXi ? (
        <div className='liXi' >
          <div className='topTitle'>
            <h3>
              Chúc Mừng Năm Mới
            </h3>
          </div>
          <button onClick={handleShowLiXi} className='back'>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="container">
            <div className="content">
              {
                lock ? (
                  <>
                    <h3 className='loiChucNamMoi'>Chúc cả nhà năm mới Bình An <br></br>
                      Tâm bình thế giới bình, <br></br> Tâm an vạn sự an.</h3>
                    <form action="">
                      <div className="inputItem">
                        <i className="fa-solid fa-user"
                          style={{ color: alertForm.hoVaTen !== '' ? 'red' : '' }}
                        ></i>
                        <input id='hoVaTen' type="text" placeholder='Họ và tên'
                          value={formDangKy.hoVaTen}
                          onChange={handleChangInput}
                          onBlur={onBlurInput}
                        // onClick={playAudio}
                        />
                      </div>
                      <div className="inputItem">
                        <i className="fa-solid fa-hashtag"
                          style={{ color: alertForm.soTaiKhoan !== '' ? 'red' : '' }}
                        ></i>
                        <input id='soTaiKhoan' type="text" placeholder='Số tài khoản'
                          value={formDangKy.soTaiKhoan}
                          onChange={handleChangInput}
                          onBlur={onBlurInput}
                        />
                      </div>
                      <div className="inputItem">
                        <i className="fa-solid fa-building-columns"
                          style={{ color: alertForm.nganHang !== '' ? 'red' : '' }}
                        ></i>
                        <select name="" id="nganHang"
                          value={formDangKy.nganHang}
                          onChange={handleChangInput}
                          onBlur={onBlurInput}
                        >
                          <option value="">Ngân hàng</option>
                          {
                            listNganHang?.map((item, index) => {
                              const { maNganHang, tenNganHang } = item
                              return (
                                <option value={maNganHang} key={index}>
                                  {tenNganHang.toLocaleUpperCase()}
                                </option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="inputItem">
                        <i className="fa-solid fa-phone"
                          style={{ color: alertForm.soDienThoai !== '' ? 'red' : '' }}
                        ></i>
                        <input id='soDienThoai' type="text" placeholder='Số điện thoại'
                          value={formDangKy.soDienThoai}
                          onChange={handleChangInput}
                          onBlur={onBlurInput}

                        />
                      </div>
                      <div className="inputItem">
                        <i className="fa-solid fa-pen"
                          style={{ color: alertForm.loiChuc !== '' ? 'red' : '' }}
                        ></i>
                        <input id='loiChuc' type="text" placeholder='Gửi lời chúc năm mới'
                          value={formDangKy.loiChuc}
                          onChange={handleChangInput}
                          onBlur={onBlurInput}
                        />
                      </div>
                      <button
                        type='button'
                        onClick={handleXacNhanThongTin}
                      // disabled={!canClick}
                      >
                        Nhận Lì Xì Ngay
                      </button>
                      {/* <p><i>(Vui lòng điền chính xác thông tin, để hệ thống chuyển khoản tiền lì xì cho bạn nhé)</i></p> */}
                    </form>
                    {
                      listNguoiThamGia.length > 0 ? (
                        <>
                          {/* <h3>Danh sách</h3> */}
                          <div className='danhSach'>
                            <table>
                              <thead>
                                <tr>
                                  <td className='ngayThang'>Ngày</td>
                                  <td className='hoVaTen'>Họ Và Tên</td>
                                  <td className='loiChuc'>Lời chúc</td>
                                  <td className='baoLiXi'>
                                    <div className='sort' onClick={handleSort}>
                                      <i className="fa-solid fa-caret-up"
                                      // onClick={handleSortNhoToiLon}
                                      ></i>
                                      <i className="fa-solid fa-caret-down"
                                      // onClick={handleSortLonToiNho}

                                      ></i>
                                    </div>
                                    Bao Lì Xì
                                  </td>
                                  <td></td>
                                  {/* <td>Trạng Thái</td> */}
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  listNguoiThamGia?.map((item, index) => {
                                    tongTien += item.liXi
                                    return (

                                      <tr key={index}>
                                        <td className='ngayThang'>
                                          {moment(item.ngay).format('HH:mm DD/MM/YYYY')}
                                        </td>
                                        <Tooltip placement="top" title={item.loiChuc}
                                          color='orangered'
                                        >
                                          <td className='hoVaTen'>
                                            {item.hoVaTen}
                                          </td>
                                        </Tooltip>
                                        <td className='loiChuc'>
                                          {item.loiChuc}
                                        </td>
                                        <Tooltip placement="top" title={item.xuLy ? 'Đã CK' : 'Chờ CK'}
                                          color='orangered'
                                        >
                                          <td className='baoLiXi'>
                                            {item.liXi.toLocaleString()}
                                          </td>
                                        </Tooltip>
                                        <td className='preview'>
                                          <i className="fa-regular fa-eye" onClick={() => handlePreview(item)}  ></i>
                                        </td>
                                        {/* <td>
                                  {
                                    item.trangThai ? 'Đã ck' : 'Chờ xử lý'
                                  }

                                </td> */}
                                      </tr>


                                    )
                                  })
                                }
                              </tbody>
                              {/* <tfoot>
                                <tr>
                                  <td colSpan={3}>Tổng tiền</td>
                                  <td className='baoLiXi'>{tongTien.toLocaleString()}</td>
                                  <td></td>
                                </tr>
                              </tfoot> */}
                            </table>

                          </div>
                        </>
                      ) : (null)
                    }
                  </>
                ) : (
                  <div className="listBaoLiXi">

                    {
                      listBaoLiXi?.map((item, index) => {
                        const { loiChuc, chuDe, buttonId } = item
                        return (
                          <div className="baoItem" key={index}>
                            <div className="baoContent">
                              <p>
                                {loiChuc}
                              </p>
                              <div className='hinhAnh'>
                                <img src="./img/rongLogo.png" alt="" />
                              </div>
                              <h3>{chuDe}</h3>
                            </div>
                            {
                              lock ? ('') : (<button
                                id={buttonId}
                                onClick={(event) => handleMoBao(event)}


                              >Mở bao lì xì</button>)
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
              {/* <div className='footer'>
                  <span><i>truongbuunhut - 2024</i></span>
                </div> */}


            </div>
            <div className={liXi > 0 ? 'overlay' : ''}
            >
            </div>
            <div id='formLogin' className={liXi == 0 ? '' : 'liXiTrans0'}>
              <div className="contentLiXi">
                <img src="./img/rongLogo.png" alt="" />
                <div className='qrCode'>
                  <QRCode value={'http://nodejs.edu.vn'} size={80} />
                </div>
                <h5>Xuân Giáp Thìn - 2024</h5>
                <h3>Lì xì may mắn</h3>
                <h2>{liXi.toLocaleString()}</h2>
                <h4>
                  {
                    ghiChu === 'sucKhoe' ? (
                      <p>
                        Kính chúc: <span>{hoVaTen}</span>
                        <br />
                        Sức khỏe dồi dào
                        <br />
                        Vạn sự như ý.
                      </p>
                    ) :
                      ghiChu === 'taiLoc' ? (
                        <p>
                          Kính chúc: <span>{hoVaTen}</span>
                          <br />
                          Tấn tài - Tấn lộc
                          <br />
                          Tiền vào như nước.
                        </p>) :
                        ghiChu === 'mayMan' ? (
                          <p>
                            Kính chúc: <span>{hoVaTen}</span>
                            <br />
                            Nhiều điều may mắn
                            <br />
                            Cả năm bình an.
                          </p>) :
                          ghiChu === 'suNghiep' ? (
                            <p>
                              Kính chúc: <span>{hoVaTen}</span>
                              <br />
                              Làm ăn phát đạt
                              <br />
                              Thuận bườm xuôi gió.
                            </p>) :
                            ghiChu === 'tinhYeu' ? (
                              <p>
                                Kính chúc: <span>{hoVaTen}</span>
                                <br />
                                Tình cảm đong đầy
                                <br />
                                Lộc phúc đầy nhà.
                              </p>) :
                              ghiChu === 'niemVui' ? (
                                <p>
                                  Kính chúc: <span>{hoVaTen}</span>
                                  <br />
                                  Thật nhiều niền vui
                                  <br />
                                  Luôn luôn tươi trẻ.
                                </p>) :
                                <>
                                  Chúc mừng năm mới.
                                </>
                  }
                </h4>
                <p>
                  {
                    xuLy ? (
                      <i style={{ color: 'royalblue' }}>Đã chuyển khoản <i className="fa-regular fa-face-smile"></i></i>
                    ) : (
                      <i>Chờ chuyển khoản <i className="fa-regular fa-face-smile"></i></i>
                    )
                  }
                </p>
              </div>
              <button type='button' className='nutDong'
                onClick={() => {
                  setLixi(0)
                  // handleBackToTop()
                  khoaScroll()
                  audioRef.current.pause();
                }
                }
              >Đóng</button>
            </div>
          </div>
        </div >
      ) : (
        en ? (
          <>
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
                    <button className='nhanLiXi' onClick={handleShowLiXi}>Nhận Lì Xì</button>
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
            <div className={overlay ? 'overlay' : ''} onClick={handleEdit}></div>
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
        ) : (
          <>
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
                    <button className='nhanLiXi' onClick={handleShowLiXi}>Nhận lì xì</button>
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
        )
      )
    }
  </>
);
}
export default App;
