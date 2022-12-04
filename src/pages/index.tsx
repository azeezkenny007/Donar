import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Campaigns,
  Donate,
  Herosection,
  Stats,
  Leaderboard,
  Blog,
  Testimonials,
} from "../components/Landing";
import Layout from "../components/layout";
export default function Home() {
  return (
    <div className="bg-light-primary App">
      <Layout>
        <Herosection />
        <Stats />
        <Donate />
        <Campaigns />
        <Leaderboard />
        <Blog />
        <Testimonials />
      </Layout>
    </div>
  );
}
