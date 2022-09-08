import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/togongs/react-hnm_netlify",
  //   timeout: 1000, // 1s 동안 응답이 없다면 실패
  headers: { "Content-type": "application/json" },
});

// 인스턴스가 생성 된 후 기본값 변경

api.defaults.headers.post["Content-Type"] = "multipart/form-data";
api.defaults.headers.common["Authorization"] = "Bearer sample_token";
console.log("api.defaults", api.defaults);

// 요청 인터셉터 추가하기
api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    console.log("api request start", config);
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    console.log("api request error", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("api get response", response);
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    console.log("api response error", error);
    return Promise.reject(error);
  }
);

export default api;
