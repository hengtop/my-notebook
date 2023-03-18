import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";

export default function Home(props) {
  console.log(props);
  const recommendClick = (item) => {
    Router.push({
      pathname: "/recommend",
      query: {
        id: item,
      },
    });
  };
  return (
    <div>
      {/* head组件是会渲染到html中head标签中，所以可以在其中设置title */}
      <Head>
        <title>主站{props.name}</title>
      </Head>
      你好
      {/* 通过a标签跳转是后端渲染，通过Link标签是前端渲染 */}
      <Link href="/about">跳转到about</Link>
      <ul>
        {[1, 2, 3].map((item) => {
          return (
            <li key={item} onClick={(e) => recommendClick(item)}>
              推荐页面{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

//这个请求第一次是在服务器中执行
Home.getInitialProps = async (props) => {
  const res = await axios({
    url: "http://123.207.32.32:8000/home/multidata",
  });
  return {
    name: "why",
    recommend: res.data.data.recommend.list,
    banner: res.data.data.banner.list,
  };
};
