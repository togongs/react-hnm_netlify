import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { authenticateAction } from "../redux/actions/authenticateAction";

const Nabar = () => {
  const authenticate = useSelector((state) => state.auth.authenticate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuList = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M Home",
    "Sale",
    "지속가능성",
  ];

  const goToLogin = () => {
    navigate("/login");
  };
  const logOut = () => {
    // setAuthenticate(false);
    dispatch(authenticateAction.logout());
  };

  // 서치바1
  const search = (event) => {
    console.log("event", event);
    if (event.key === "Enter") {
      let keyword = event.target.value;
      console.log("keyword", keyword);
      // 입력한 검색어를 읽어와서 url을 바꿔준다 -> keyword를 가져와서 api에서 검사
      navigate(`/?q=${keyword}`);
    }
  };

  return (
    <div>
      <div>
        {authenticate === true ? (
          <div className="login-button" onClick={logOut}>
            <FontAwesomeIcon icon={faUser} />
            <div>로그아웃</div>
          </div>
        ) : (
          <div className="login-button" onClick={goToLogin}>
            <FontAwesomeIcon icon={faUser} />
            <div>로그인</div>
          </div>
        )}
      </div>
      <div className="nav-section">
        <Link to="/">
          <img
            alt=""
            width={200}
            src="http://www.hm.com/entrance/assets/bundle/img/HM-Share-Image.jpg"
          />
        </Link>
      </div>
      <div className="menu-area">
        <ul className="menu-list">
          {menuList.map((menu) => (
            <li>{menu}</li>
          ))}
        </ul>

        <div>
          <FontAwesomeIcon icon={faSearch} />
          {/* 엔터(Key) 클릭 시, event 호출 */}
          <input type="text" onKeyPress={(event) => search(event)} />
        </div>
      </div>
    </div>
  );
};

export default Nabar;
