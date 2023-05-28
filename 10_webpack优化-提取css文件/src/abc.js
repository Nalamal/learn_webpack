// import axios from "axios";
// import dayjs from dayjs

axios.get("http://codercba.com:9002/lyric?id=1842025914").then((res) => {
  console.log(res);
});

console.log(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
