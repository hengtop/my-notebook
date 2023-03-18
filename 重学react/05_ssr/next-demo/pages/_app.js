import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Link href="/">home</Link>|<Link href="/about">about</Link>|
        <Link href="/profile/info">profile</Link>
        <hr></hr>
      </div>
      <Component {...pageProps} />
      <hr></hr>
      <footer>我是底部栏</footer>
    </>
  );
}

export default MyApp;
