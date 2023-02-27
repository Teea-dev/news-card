import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import "./App.scss";

function App() {
  const [getNews, setGetNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const URL =
        "https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed";
      try {
        const res = await axios.get(URL);
        console.log(res.data);
        setGetNews(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div>
      <h1 className="heading">DailyNews</h1>
      <hr />
      {getNews.map((news) => (
        <div className="item items--2" key={news.id}>
          <img
            src={news.jetpack_featured_media_url}
            alt=""
            className="images"
          />
          <span>
            <h3 className="author">
              {news.parselyMeta["parsely-author"][0]}.
              <span className="date">
                {new Date(news.date).getUTCDate()},
                {new Date(news.date).toString().split(" ")[1].toUpperCase()}
              </span>
            </h3>{" "}
          </span>
          <div
            className="section"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.parselyMeta["parsely-section"]),
            }}
          />
          <div
            className="title"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.parselyMeta["parsely-title"]),
            }}
          />

          <div
            className="main-news"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.excerpt.rendered),
            }}
          />
        <a href={news.link} target='_blank'   >Read Full Article...</a>
          {/* <p>
              dangerouslySetInnerHTML={}
            </p> */}
        </div>
      ))}
    </div>
  );
}

export default App;
